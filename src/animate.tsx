import React, {useState, useEffect} from 'react';
import {useId} from 'react-id-generator';

import AnimationControl from './animate_control';
import {AnimationState, AnimateProps, AnimationRun, CurrentState, IAnimationResult} from './types';
import {
    setStateForFinishedAction,
    setStateForNewAction,
    setCurrentStateToUnmountedForActionCount,
    setHasRunForActionCount,
    setCurrentStateToRunningForActionCount,
    setCurrentStateToFinishedForActionCount,
    setCurrentStateToInitializingForActionCount,
    setChildStateForActionCount,
    addClassNamesToCurrentStateForActionCount,
    setCurrentStateToRestartingToClearExistingAnimationForActionCount
} from './animation_state_transforms';
import {ILogger} from 'beano';

const childrenMatch = (
    childrenOfInterest: string[],
    statesToMatch: Array<AnimationState | undefined>,
    allChildren: {[childId: string]: AnimationState | undefined}
): boolean => {
    const childrenToLookAt = Object.keys(allChildren).filter(childId =>
        childrenOfInterest.includes(childId)
    );

    if (childrenToLookAt.length === 0) {
        return false;
    }
    return childrenToLookAt.reduce((acc, childId) => {
        return acc && statesToMatch.includes(allChildren[childId]);
    }, true as boolean);
};

const Animate = <PredicateState, TriggerState>({
    name,

    logger,

    visible: visibleProp,
    triggerState,
    predicateState,

    when,
    children,
    unmountOnHide: _unMountOnHide,
    id,

    enterAfterParentStart,
    enterAfterParentFinish,
    exitAfterChildStart,
    exitAfterChildFinish,

    animationBinding
}: AnimateProps<PredicateState, TriggerState>): ReturnType<React.FC<
    AnimateProps<PredicateState, TriggerState>
>> => {
    const moduleLogger = logger && logger.child('kinnetic-components');
    const animateLogger = moduleLogger && moduleLogger.child('Animate Component');
    const namedAnimationLogger = animateLogger && animateLogger.child(name || 'unnamed');

    const [eState, setEState] = useState<CurrentState<TriggerState | undefined>>({
        actionCount: 0,
        currentState: 'initalizing',
        hasRunForCycle: false,
        prevTriggerState: undefined,
        triggerState: triggerState || undefined,
        prevVisible: undefined,
        visible: false,
        childStates: {},
        classNames: [],
        prevAnimationKey: undefined,
        animationKey: undefined
    });

    const specificAnimateLogger =
        namedAnimationLogger && namedAnimationLogger.child(eState.currentState);
    specificAnimateLogger && specificAnimateLogger.info(eState.currentState);
    const visible =
        animationBinding && animationBinding.parentVisible === false ? false : visibleProp;

    // const visible = visibleProp;

    const [uuid] = useId();

    const [ref, setRef] = useState<HTMLElement | null>();

    const refId = ref ? ref.id : undefined;

    const unMountOnHide = _unMountOnHide === undefined ? true : _unMountOnHide;

    specificAnimateLogger &&
        specificAnimateLogger.debug(
            {
                refId: refId,
                hasRun: eState.hasRunForCycle,
                currentState: eState.currentState,
                childState: eState.childStates,
                'incoming trigger': triggerState,
                'incoming visibility': visible,
                'old visibility': eState.visible,
                prevAnimationKey: eState.prevAnimationKey,
                animationKey: eState.animationKey
            },
            'initial state'
        );

    const createAnimationControl = (): AnimationControl => {
        const ac = new AnimationControl();
        ac.setOnFinishAction(() => {
            setStateForFinishedAction(setEState);
        });
        return ac;
    };

    // TODO enable setting of animation control
    const [animationControl, setAnimationControl] = useState<AnimationControl>(
        createAnimationControl()
    );

    useEffect(() => {
        if (animationBinding) {
            specificAnimateLogger &&
                specificAnimateLogger.info(eState.currentState, 'Notifying parent of state');

            animationBinding.notifyParentOfState(id || uuid, eState.currentState);
        }
    }, [eState.currentState]);

    useEffect(() => {
        return () => {
            if (animationBinding) {
                specificAnimateLogger &&
                    specificAnimateLogger.debug('Unmounting from unmount action');

                animationBinding.notifyParentOfState(id || uuid, 'unmounted');
            }
        };
    }, ['onExit']);

    useEffect(() => {
        setAnimationControl(c => {
            c.cancel();
            return createAnimationControl();
        });
        setStateForNewAction(setEState, triggerState, visible);
    }, [JSON.stringify(triggerState), visible]);

    const animate = (node: HTMLElement, animateSubFnLogger?: ILogger): AnimationRun => {
        const asfLogger = animateSubFnLogger && animateSubFnLogger.child('Animate Sub Fn');
        asfLogger &&
            asfLogger.debug(
                {
                    prevTriggerState: eState.prevTriggerState,
                    triggerState,
                    prevVisible: eState.prevVisible,
                    visible
                },
                'State'
            );

        return (when || []).reduce(
            (acc, predicateAnimation) => {
                asfLogger &&
                    asfLogger.debug({predicateAnimation}, 'Running predicate animation group');
                const {hasRun, ctx} = acc;
                if (hasRun) {
                    asfLogger &&
                        asfLogger.debug(
                            {hasRun},
                            'Exiting early from evaluating predicate animation group'
                        );

                    return acc;
                }
                let shouldRun: boolean;
                const predicate = predicateAnimation[0];
                if (Array.isArray(predicate)) {
                    const predicateLogger = asfLogger && asfLogger.child('Predicate');

                    shouldRun = predicate.reduce((accc, childPredicate) => {
                        const childPredicateResult = childPredicate(predicateState, {
                            prevTriggerState: eState.prevTriggerState,
                            triggerState,
                            prevVisible: eState.prevVisible,
                            visible
                        });
                        predicateLogger &&
                            predicateLogger.debug({childPredicateResult}, 'Child Predicate result');
                        return accc && childPredicateResult;
                    }, true as boolean);
                    predicateLogger &&
                        predicateLogger.debug({shouldRun}, 'Total predicates result');
                } else {
                    shouldRun = predicate(predicateState, {
                        prevTriggerState: eState.prevTriggerState,
                        triggerState,
                        prevVisible: eState.prevVisible,
                        visible
                    });
                }
                asfLogger && asfLogger.debug({shouldRun}, 'Should run animation');

                if (shouldRun) {
                    const animation = predicateAnimation[1];
                    const options = predicateAnimation[2];
                    const animationKey = options ? options.key : undefined;

                    asfLogger && asfLogger.debug({animationKey}, 'Found animation key');

                    const animationResult = animation(ctx);
                    if (animationResult) {
                        return {hasRun: true, ctx, animationResult, animationKey};
                    } else {
                        return {...acc, hasRun: true, ctx};
                    }
                }
                return acc;
            },
            {
                hasRun: false,
                ctx: {node},
                animationResult: null,
                animationKey: undefined
            } as AnimationRun
        );
    };

    useEffect(() => {
        specificAnimateLogger &&
            specificAnimateLogger.debug({actionCount: eState.actionCount}, 'Updated action count');
    }, [eState.actionCount]);

    useEffect(() => {
        if (!refId) {
            specificAnimateLogger && specificAnimateLogger.debug({ref: refId}, 'Updated to no ref');
        } else {
            specificAnimateLogger && specificAnimateLogger.debug({ref: refId}, 'Update to new ref');
        }
    }, [refId]);

    const parentState = (animationBinding && animationBinding.parentState) || 'initalizing';
    const parentVisible = (animationBinding && animationBinding.parentVisible) || true;

    useEffect(() => {
        specificAnimateLogger && specificAnimateLogger.debug({parentState}, 'Update parentState');
    }, [parentState]);

    useEffect(() => {
        specificAnimateLogger &&
            specificAnimateLogger.debug({parentVisible}, 'Update parentVisible');
    }, [parentVisible]);

    useEffect(() => {
        specificAnimateLogger &&
            specificAnimateLogger.debug({childStates: eState.childStates}, 'Update childStates');
    }, [JSON.stringify(eState.childStates)]);

    /**
     * Run animations whenever there is a state change
     */
    useEffect(() => {
        const animateEffectLogger =
            specificAnimateLogger && specificAnimateLogger.child('animate effect');

        if (eState.currentState === 'restarting') {
            animateEffectLogger &&
                animateEffectLogger.debug({restarting: true}, 'Exiting should animate effect');

            return;
        }
        if (ref == null) {
            const nullRefLogger = animateEffectLogger && animateEffectLogger.child('No ref found');

            if (animationControl.cancel) {
                nullRefLogger && nullRefLogger.debug('Canceling existing animation');

                animationControl.cancel();
            }
            if (!visible) {
                setCurrentStateToUnmountedForActionCount(setEState);
            }
            nullRefLogger &&
                nullRefLogger.debug({refMissing: true}, 'Exiting should animate effect');

            return;
        }

        if (eState.hasRunForCycle === true) {
            animateEffectLogger &&
                animateEffectLogger.debug({hasRunForCycle: true}, 'Exiting should animate effect');

            return;
        }

        if (
            visible &&
            enterAfterParentStart &&
            parentState !== 'running' &&
            parentState !== 'finished'
        ) {
            animateEffectLogger &&
                animateEffectLogger.debug(
                    'Exiting should animate effect: waiting for parent to start'
                );

            return;
        }

        if (
            !visible &&
            exitAfterChildStart &&
            exitAfterChildStart.length > 0 &&
            childrenMatch(
                exitAfterChildStart,
                // if matches the states that come before the finished state
                [undefined, 'restarting', 'initalizing'],
                eState.childStates
            )
        ) {
            animateEffectLogger &&
                animateEffectLogger.debug(
                    'Exiting should animate effect: waiting for child to start'
                );

            return;
        }

        if (visible && enterAfterParentFinish && parentState !== 'finished') {
            animateEffectLogger &&
                animateEffectLogger.debug(
                    'Exiting should animate effect: waiting for parent to finish'
                );

            return;
        }

        if (
            !visible &&
            exitAfterChildFinish &&
            exitAfterChildFinish.length > 0 &&
            childrenMatch(
                exitAfterChildFinish,
                // if matches the states that come before the finished state
                [undefined, 'restarting', 'initalizing', 'running'],
                eState.childStates
            )
        ) {
            animateEffectLogger &&
                animateEffectLogger.debug(
                    'Exiting should animate effect: waiting for child to finish'
                );

            return;
        }

        animateEffectLogger && animateEffectLogger.debug({when}, 'Animation running');

        const {ctx: animationCtx, hasRun, animationResult, animationKey} = animate(
            ref,
            animateEffectLogger
        );
        animateEffectLogger &&
            animateEffectLogger.debug(
                {hasRun, animationCtx, animationResult, animationKey},
                'Animation ran'
            );

        if (animationKey !== undefined && animationKey === eState.prevAnimationKey) {
            animateEffectLogger &&
                animateEffectLogger.debug(
                    {newAnimationKey: animationKey, prevAniamtionKey: eState.prevAnimationKey},
                    'Found animation ran twice in a row. Unmounting component to clear animation'
                );

            setCurrentStateToRestartingToClearExistingAnimationForActionCount(setEState);
            return;
        } else {
            setHasRunForActionCount(setEState);
        }
        if (hasRun) {
            animateEffectLogger &&
                animateEffectLogger.debug('setting current state to has run = true');
            // pass in any animation keys so we can record which animation took place
            setCurrentStateToRunningForActionCount(setEState, animationKey);
        }

        animateEffectLogger &&
            animateEffectLogger.debug(
                {newAnimationKey: animationKey, prevAniamtionKey: eState.animationKey},
                'Keys'
            );
        if (
            animationResult &&
            (Array.isArray(animationResult) || typeof animationResult === 'string')
        ) {
            animateEffectLogger &&
                animateEffectLogger.debug({hasRun, animationCtx}, 'Found CSS animation');

            // eslint-disable-next-line
            const createFinishedPromise = (): Promise<any> => {
                const d = document.getElementById(ref.id);

                if (!d) {
                    return Promise.resolve();
                }
                return new Promise(resolve => {
                    const handleEvent = (): void => {
                        d.removeEventListener('animationend', handleEvent);
                        resolve();
                    };
                    addEventListener('animationend', handleEvent);
                });
            };
            animationControl.createOnFinishPromise(createFinishedPromise());

            addClassNamesToCurrentStateForActionCount(
                setEState,
                typeof animationResult === 'string' ? [animationResult] : animationResult
            );
            // TODO change these IAnimationResult castings to type guards
        } else if (animationResult && (animationResult as IAnimationResult).finished) {
            animateEffectLogger &&
                animateEffectLogger.debug({hasRun, animationCtx}, 'Found JS animation');

            animationControl.createOnFinishPromise((animationResult as IAnimationResult).finished);
        } else {
            animateEffectLogger &&
                animateEffectLogger.debug('No finish promises found. Setting state to finished');

            setCurrentStateToFinishedForActionCount(setEState);
        }
    }, [
        eState.currentState,
        eState.actionCount,
        refId,
        parentState,
        JSON.stringify(eState.childStates)
    ]);

    useEffect(() => {
        specificAnimateLogger &&
            specificAnimateLogger.debug(
                {currentState: eState.currentState},
                'Updated currentState'
            );
    }, [eState.currentState]);

    useEffect(() => {
        if (eState.currentState === 'restarting') {
            specificAnimateLogger &&
                specificAnimateLogger.debug(
                    {currentState: eState.currentState},
                    'Setting currentState to initializing from restarting'
                );

            setCurrentStateToInitializingForActionCount(setEState);
        }
    }, [eState.currentState]);

    const endLogger = specificAnimateLogger && specificAnimateLogger.child('end');
    if (eState.currentState === 'restarting') {
        endLogger &&
            endLogger.debug(
                {currentState: eState.currentState},
                'Returning null for component b/c restarting'
            );
        // Return null to unmount children and allow new animation to be in correct dom position
        // incase an animation applied a transform or similar
        return null;
    }
    if (ref == null && unMountOnHide && visible === false) {
        endLogger && endLogger.debug({ref, unMountOnHide, visible}, 'Returning null');
        return null;
    }

    const setRefOfAnimateable = (ref: HTMLElement): void => {
        // TODO: for some reason null is returned whenever this component rerenders.
        // Possibly due to the cloneElement behavior.
        // This prevents knowing about child unmount events, which isn't a big deal
        // if using the Animateable component.
        // However, if run in uncontrolled mode, this could be a problem.
        if (ref == null) {
            return;
        }
        setRef(ref);
    };

    const realChildren = children
        ? React.cloneElement(children, {
              ref: setRefOfAnimateable,
              id: uuid,
              className: eState.classNames,
              animationBinding: {
                  notifyParentOfState: setChildStateForActionCount(setEState),
                  parentState: eState.currentState,
                  parentVisible: eState.visible
              }
          })
        : null;

    if (
        visible &&
        enterAfterParentStart &&
        parentState !== 'running' &&
        parentState !== 'finished'
    ) {
        endLogger && endLogger.debug('Waiting for parent to start before showing children');
        return null;
    }

    if (visible && enterAfterParentFinish && parentState !== 'finished') {
        endLogger && endLogger.debug('Waiting for parent to finish before showing children');

        return null;
    }

    if (eState.currentState === 'unmounted') {
        endLogger && endLogger.debug('Unmounted. Not showing showing children');

        return null;
    }

    if (
        !visible &&
        unMountOnHide &&
        eState.currentState === 'finished' &&
        // TODO change to only do a shallow compare
        // Guard against running one new trigger states.
        //  Often, on !visible states we are also in the 'finished' state
        //  doing an unmount at the beginning can kill the child animations
        JSON.stringify({triggerState, visible}) ===
            JSON.stringify({triggerState: eState.triggerState, visible: eState.visible})
    ) {
        endLogger && endLogger.debug('Unmounted b/c not visible and animation finished');

        if (eState.currentState === 'finished') {
            setCurrentStateToUnmountedForActionCount(setEState);
        }
        return null;
    } else {
        endLogger && endLogger.debug('Showing children');

        return realChildren;
    }
};

export default Animate;

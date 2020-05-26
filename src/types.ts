import {ILogger} from 'beano';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnimationState = 'restarting' | 'initalizing' | 'running' | 'finished' | 'unmounted';

export type NotifyParentOfState = (id: string, state: AnimationState) => void;

export type AnimationBinding = {
    notifyParentOfState: NotifyParentOfState;
    parentState: AnimationState;
    parentVisible: boolean;
};

/**
 * The state of the animation control component
 */
export type CurrentState<TriggerState> = {
    actionCount: number; // The current action count. Each layout change counts as an action
    currentState: AnimationState; // 'restarting', 'initalizing', 'running', 'finished', 'unmounted'
    hasRunForCycle: boolean; // Flag tracking whether this component has an animation is in progress for this action count
    triggerState: TriggerState;
    prevTriggerState: TriggerState | undefined;
    childStates: {
        // The state of each child
        [childId: string]: AnimationState | undefined;
    };
    prevVisible: boolean | undefined;
    visible: boolean;
    classNames: string[];
    prevAnimationKey: string | undefined;
    animationKey: AnimationKey | undefined;
};

export type Predicate = <PS extends any, TS extends any>(
    predicateState: any, // TODO replace with PS once excessively deep type problem is fixed
    {
        triggerState,
        visible
    }: {
        prevTriggerState: any;
        triggerState: any;
        prevVisible: boolean | undefined;
        visible: boolean;
    } // TODO replace with PS once excessively deep type problem is fixed
) => boolean;

export type Predicates = Array<Predicate>;

export type AnimationCtx = {
    node: HTMLElement;
};

export interface IAnimationResult {
    finished: Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type AnimationRun = {
    hasRun: boolean;
    ctx: AnimationCtx;
    animationResult: AnimationResult;
    animationKey?: AnimationKey;
};

/**
 * IAnimationResult for custom JS animations; string | string[] for CSS animation (these are class names)
 */
export type AnimationResult = IAnimationResult | string | string[] | null;

export type PredicateAnimation = (ctx: AnimationCtx) => AnimationResult;

export type AnimationKey = string;
export type PredicateAnimationPairOptions = {key: AnimationKey};
export type When = Array<
    | [Predicates | Predicate, PredicateAnimation, PredicateAnimationPairOptions]
    | [Predicates | Predicate, PredicateAnimation]
>;

export interface AnimateProps<PS, TS> {
    key?: string;

    name?: string;
    logger?: ILogger;
    visible?: boolean;
    triggerState?: TS;
    predicateState?: PS;

    when?: When;
    children?: React.ReactElement;

    unmountOnHide?: boolean;

    id?: string;

    parentState?: AnimationState;

    animationBinding?: AnimationBinding;
    enterAfterParentStart?: boolean;
    enterAfterParentFinish?: boolean;
    exitAfterChildStart?: string[];
    exitAfterChildFinish?: string[];

    beforeUnmount?: (key: string) => any;
}

export interface AnimateableProps {
    id?: string;
    className?: string;
    animationBinding?: AnimationBinding;
    parentState?: AnimationState;

    style?: object;
    children?:
        | (<P, T extends string>(
              animationBinding: AnimationBinding | undefined,
              parentBinding: AnimationState | undefined
          ) => any)
        | React.ReactElement
        // | any
        | Element;
}

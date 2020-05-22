import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import {
    StyledAnimatable,
    Button,
    Code,
    Playground,
    VisibleToggle,
    JSCSSButtons,
    JSCSSToggle,
    PlaygroundInstructions
} from '../components';

const animateInCSS = (): AnimationResult => ['animate__animated', 'animate__fadeInRight'];
const animateOutCSS = (): AnimationResult => ['animate__animated', 'animate__fadeOutRight'];

const animateInJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '50%'],
        opacity: [0, 1],
        easing: 'linear',
        duration: 100
    });

const animateOutJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: ['50%', 0],
        opacity: [1, 0],
        easing: 'linear',
        duration: 200
    });

const ParentAnimatable = styled(StyledAnimatable)`
    background-color: rgb(155, 255, 181);
`;

const ChildAnimatable = styled(StyledAnimatable)`
    background-color: #cbe9ff;
`;

const Buttons = styled.div`
    display: flex;
`;

const SceneThree: React.FC = () => (
    <>
        <Code>{`
import {Animate, Animatable, predicates} from 'kinetic-components';

export default ({isVisibleParent, isVisibleChild, animateIn, animateOut, parentStyles, childStyles}) => (
    <Animate
        visible={isVisibleParent}
        when={[
            [predicates.isVisible, animateIn],
            [predicates.isHidden, animateOut]
        ]}
    >
        <Animatable  styles={parentStyles}>
            {animationBinding => (
                <Animate
                    visible={isVisibleChild}
                    enterAfterParentFinish
                    animationBinding={animationBinding}
                    when={[
                        [predicates.isVisible, animateIn],
                        [predicates.isHidden, animateOut]
                    ]}
                >
                    <Animatable styles={childStyles}/>
                </Animate>
            )}
        </Animatable>
    </Animate>
});
        
        `}</Code>
        <PlaygroundInstructions />
        <Playground>
            <JSCSSToggle>
                {({isJS, setIsJS, setIsCSS}) => (
                    <>
                        <JSCSSButtons setIsJS={setIsJS} setIsCSS={setIsCSS} isJS={isJS} />
                        <VisibleToggle>
                            {({isVisible: isVisibleOne, toggleVisible: toggleVisibleOne}) => (
                                <VisibleToggle>
                                    {({
                                        isVisible: isVisibleTwo,
                                        toggleVisible: toggleVisibleTwo
                                    }) => (
                                        <>
                                            <Buttons>
                                                <Button onClick={toggleVisibleOne}>{`Parent: ${
                                                    isVisibleOne ? 'hide' : 'show'
                                                }`}</Button>
                                                {/* <Button onClick={toggleVisibleTwo}>{`Child: ${
                                                    isVisibleTwo ? 'hide' : 'show'
                                                }`}</Button> */}
                                            </Buttons>

                                            <Animate
                                                name={'parent'}
                                                visible={isVisibleOne}
                                                when={[
                                                    [
                                                        predicates.isVisible,
                                                        isJS ? animateInJS : animateInCSS
                                                    ],
                                                    [
                                                        predicates.isHidden,
                                                        isJS ? animateOutJS : animateOutCSS
                                                    ]
                                                ]}
                                            >
                                                <ParentAnimatable>
                                                    {animationBinding => (
                                                        <Animate
                                                            id={'scene-three-child'}
                                                            name={'child'}
                                                            visible={isVisibleTwo}
                                                            enterAfterParentFinish
                                                            animationBinding={animationBinding}
                                                            when={[
                                                                [
                                                                    predicates.isVisible,
                                                                    isJS
                                                                        ? animateInJS
                                                                        : animateInCSS
                                                                ],
                                                                [
                                                                    predicates.isHidden,
                                                                    isJS
                                                                        ? animateOutJS
                                                                        : animateOutCSS
                                                                ]
                                                            ]}
                                                        >
                                                            <ChildAnimatable />
                                                        </Animate>
                                                    )}
                                                </ParentAnimatable>
                                            </Animate>
                                        </>
                                    )}
                                </VisibleToggle>
                            )}
                        </VisibleToggle>
                    </>
                )}
            </JSCSSToggle>
        </Playground>
    </>
);

export default SceneThree;

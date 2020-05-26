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

const animateInCSS = (): AnimationResult => ['animate__animated', 'animate__bounceInRight'];
const animateOutCSS = (): AnimationResult => ['animate__animated', 'animate__bounceOutRight'];

const animateInJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '50%'],
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: 120
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
    // background-color: rgb(155, 255, 181);
    background-color: white;
`;

const FirstChildAnimatable = styled(StyledAnimatable)`
    // background-color: #cbe9ff;
    background-color: white;
`;

const SecondChildAnimatable = styled(StyledAnimatable)`
    // background-color: #ffb0b0;
    background-color: white;
`;

const Buttons = styled.div`
    display: flex;
    margin-top: 20px;
`;

const SceneFive: React.FC = () => (
    <>
        <Code>{`
import {Animate, Animatable, predicates} from 'kinetic-components';

export default ({isVisibleParent, isVisibleChildOne, isVisibleChildTwo, animateIn, animateOut, parentStyles, childOneStyles, childTwoStyles}) => (
    <Animate
        visible={isVisibleParent}
        exitAfterChildFinish={['child-one']}
        when={[
            [predicates.isVisible, animateIn],
            [predicates.isHidden, animateOut]
        ]}
    >
        <Animatable  styles={parentStyles}>
            {parentAnimationBinding => (
                <Animate
                    {...parentAnimationBinding}
                    id={'child-one'}
                    visible={isVisibleChildOne}
                    exitAfterChildFinish={['child-two']}
                    enterAfterParentFinish
                    when={[
                        [predicates.isVisible, animateIn],
                        [predicates.isHidden, animateOut]
                    ]}
                >
                    <Animatable  styles={childOneStyles}>
                        {childAnimationBinding => (
                            <Animate
                                {...childAnimationBinding}
                                id={'child-two'}
                                visible={isVisibleChildTwo}
                                enterAfterParentFinish
                                when={[
                                    [predicates.isVisible, animateIn],
                                    [predicates.isHidden, animateOut]
                                ]}
                            >
                                <Animatable styles={childTwoStyles} />
                            </Animate>
                        )}
                    </Animatable>
                </Animate>
            )}
        </Animatable>
    </Animate>
)};
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
                                    {({isVisible: isVisibleTwo}) => (
                                        <VisibleToggle>
                                            {({isVisible: isVisibleThree}) => (
                                                <>
                                                    <Buttons>
                                                        <Button onClick={toggleVisibleOne}>{` ${
                                                            isVisibleOne ? 'hide' : 'show'
                                                        }`}</Button>
                                                        {/* <Button
                                                            onClick={toggleVisibleTwo}
                                                        >{`Child 1: ${
                                                            isVisibleTwo ? 'hide' : 'show'
                                                        }`}</Button>
                                                        <Button
                                                            onClick={toggleVisibleThree}
                                                        >{`Child 2: ${
                                                            isVisibleThree ? 'hide' : 'show'
                                                        }`}</Button> */}
                                                    </Buttons>

                                                    <Animate
                                                        name={'parent'}
                                                        visible={isVisibleOne}
                                                        exitAfterChildFinish={[
                                                            'scene-five-child-one'
                                                        ]}
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
                                                            {parentAnimationBinding => (
                                                                <Animate
                                                                    {...parentAnimationBinding}
                                                                    id={'scene-five-child-one'}
                                                                    name={'child-one'}
                                                                    visible={isVisibleTwo}
                                                                    exitAfterChildFinish={[
                                                                        'scene-five-child-two'
                                                                    ]}
                                                                    enterAfterParentFinish
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
                                                                    <FirstChildAnimatable>
                                                                        {childAnimationBinding => (
                                                                            <Animate
                                                                                {...childAnimationBinding}
                                                                                id={
                                                                                    'scene-five-child-two'
                                                                                }
                                                                                name={'child-two'}
                                                                                visible={
                                                                                    isVisibleThree
                                                                                }
                                                                                enterAfterParentFinish
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
                                                                                <SecondChildAnimatable />
                                                                            </Animate>
                                                                        )}
                                                                    </FirstChildAnimatable>
                                                                </Animate>
                                                            )}
                                                        </ParentAnimatable>
                                                    </Animate>
                                                </>
                                            )}
                                        </VisibleToggle>
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

export default SceneFive;

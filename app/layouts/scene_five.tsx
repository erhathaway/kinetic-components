import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import VisibleToggle from '../components/visible_toggle';
import Button from '../components/button';
import StyledAnimatable from '../components/animatable';

const animateIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '50%'],
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: 120
    });

const animateOut = (ctx: AnimationCtx): AnimationResult =>
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

const FirstChildAnimatable = styled(StyledAnimatable)`
    background-color: #cbe9ff;
`;

const SecondChildAnimatable = styled(StyledAnimatable)`
    background-color: #ffb0b0;
`;

const Buttons = styled.div`
    display: flex;
`;

const SceneFive: React.FC = () => (
    <VisibleToggle>
        {({isVisible: isVisibleOne, toggleVisible: toggleVisibleOne}) => (
            <VisibleToggle>
                {({isVisible: isVisibleTwo, toggleVisible: toggleVisibleTwo}) => (
                    <VisibleToggle>
                        {({isVisible: isVisibleThree, toggleVisible: toggleVisibleThree}) => (
                            <>
                                <Buttons>
                                    <Button onClick={toggleVisibleOne}>{`Parent: ${
                                        isVisibleOne ? 'hide' : 'show'
                                    }`}</Button>
                                    <Button onClick={toggleVisibleTwo}>{`Child 1: ${
                                        isVisibleTwo ? 'hide' : 'show'
                                    }`}</Button>
                                    <Button onClick={toggleVisibleThree}>{`Child 2: ${
                                        isVisibleThree ? 'hide' : 'show'
                                    }`}</Button>
                                </Buttons>

                                <Animate
                                    name={'parent'}
                                    visible={isVisibleOne}
                                    exitAfterChildFinish={['scene-five-child-one']}
                                    when={[
                                        [predicates.isVisible, animateIn],
                                        [predicates.isHidden, animateOut]
                                    ]}
                                >
                                    <ParentAnimatable facc>
                                        {parentAnimationBinding => (
                                            <div>
                                                <Animate
                                                    id={'scene-five-child-one'}
                                                    name={'child-one'}
                                                    visible={isVisibleTwo}
                                                    exitAfterChildFinish={['scene-five-child-two']}
                                                    enterAfterParentFinish
                                                    animationBinding={parentAnimationBinding}
                                                    when={[
                                                        [predicates.isVisible, animateIn],
                                                        [predicates.isHidden, animateOut]
                                                    ]}
                                                >
                                                    <FirstChildAnimatable facc>
                                                        {childAnimationBinding => (
                                                            <div>
                                                                <Animate
                                                                    id={'scene-five-child-two'}
                                                                    name={'child-two'}
                                                                    visible={isVisibleThree}
                                                                    enterAfterParentFinish
                                                                    animationBinding={
                                                                        childAnimationBinding
                                                                    }
                                                                    when={[
                                                                        [
                                                                            predicates.isVisible,
                                                                            animateIn
                                                                        ],
                                                                        [
                                                                            predicates.isHidden,
                                                                            animateOut
                                                                        ]
                                                                    ]}
                                                                >
                                                                    <SecondChildAnimatable />
                                                                </Animate>
                                                            </div>
                                                        )}
                                                    </FirstChildAnimatable>
                                                </Animate>
                                            </div>
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
);

export default SceneFive;

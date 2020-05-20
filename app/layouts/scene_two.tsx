import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from '../../src';
import VisibleToggle from '../components/visible_toggle';
import Button from '../components/button';

const animateIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '50%'],
        opacity: [0, 1]
    });

const animateOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: ['50%', 0],
        opacity: [1, 0],
        easing: 'linear',
        duration: 200
    });

const ParentAnimatable = styled(Animatable)`
    margin-top: 100px;
    height: 150px;
    width: 400px;
    background-color: Chartreuse;
    border: 1px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const ChildAnimatable = styled(ParentAnimatable)`
    background-color: blue;
`;

const Buttons = styled.div`
    display: flex;
`;

const SceneTwo: React.FC = () => (
    <VisibleToggle>
        {({isVisible: isVisibleOne, toggleVisible: toggleVisibleOne}) => (
            <VisibleToggle>
                {({isVisible: isVisibleTwo, toggleVisible: toggleVisibleTwo}) => (
                    <>
                        <Buttons>
                            <Button onClick={toggleVisibleOne}>{`Parent: ${
                                isVisibleOne ? 'hide' : 'show'
                            }`}</Button>
                            <Button onClick={toggleVisibleTwo}>{`Child: ${
                                isVisibleTwo ? 'hide' : 'show'
                            }`}</Button>
                        </Buttons>

                        <Animate
                            name={'parent'}
                            visible={isVisibleOne}
                            // exitAfterChildFinish={['inside']}
                            when={[
                                [predicates.isVisible, animateIn],
                                [predicates.isHidden, animateOut]
                            ]}
                        >
                            <ParentAnimatable facc>
                                {animationBinding => (
                                    <div>
                                        <Animate
                                            id={'inside'}
                                            name={'inside'}
                                            visible={isVisibleTwo}
                                            enterAfterParentFinish
                                            animationBinding={animationBinding}
                                            when={[
                                                [predicates.isVisible, animateIn],
                                                [predicates.isHidden, animateOut]
                                            ]}
                                        >
                                            <ChildAnimatable />
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
);

export default SceneTwo;

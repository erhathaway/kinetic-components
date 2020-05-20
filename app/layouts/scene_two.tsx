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

const ParentAnimatable = styled(StyledAnimatable)`
    background-color: lightgrey;
`;

const ChildAnimatable = styled(StyledAnimatable)`
    background-color: lightskyblue;
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
                            when={[
                                [predicates.isVisible, animateIn],
                                [predicates.isHidden, animateOut]
                            ]}
                        >
                            <ParentAnimatable>
                                <div>
                                    <Animate
                                        name={'child'}
                                        visible={isVisibleTwo}
                                        when={[
                                            [predicates.isVisible, animateIn],
                                            [predicates.isHidden, animateOut]
                                        ]}
                                    >
                                        <ChildAnimatable />
                                    </Animate>
                                </div>
                            </ParentAnimatable>
                        </Animate>
                    </>
                )}
            </VisibleToggle>
        )}
    </VisibleToggle>
);

export default SceneTwo;

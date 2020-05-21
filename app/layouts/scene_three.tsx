import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import {StyledAnimatable, Button, Code, Playground, VisibleToggle} from '../components';

const animateInJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '50%'],
        opacity: [0, 1]
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
import {Animate, Animatable, predicates} from 'animated-components-react';

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
        <Playground>
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
                                        [predicates.isVisible, animateInJS],
                                        [predicates.isHidden, animateOutJS]
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
                                                    [predicates.isVisible, animateInJS],
                                                    [predicates.isHidden, animateOutJS]
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
        </Playground>
    </>
);

export default SceneThree;

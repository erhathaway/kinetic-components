import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import {StyledAnimatable, Button, Code, Playground, VisibleToggle} from '../components';

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

const ChildAnimatable = styled(StyledAnimatable)`
    background-color: #cbe9ff;
`;

const Buttons = styled.div`
    display: flex;
`;

const SceneFour: React.FC = () => (
    <>
        <Code>{`
import {(Animate, Animatable, predicates)} from 'animated-components-react'; 

export default ({isVisibleParent, isVisibleChild, animateIn, animateOut, parentStyles, childStyles}) => (
    <Animate
        visible={isVisibleOne}
        exitAfterChildFinish={['child']}
        when={[
            [predicates.isVisible, animateIn],
            [predicates.isHidden, animateOut]
        ]}
    >
        <Animatable facc styles={parentStyles}>
            {animationBinding => (
                <Animate
                    id={'child'}
                    visible={isVisibleTwo}
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
                                    exitAfterChildFinish={['scene-four-child']}
                                    when={[
                                        [predicates.isVisible, animateIn],
                                        [predicates.isHidden, animateOut]
                                    ]}
                                >
                                    <ParentAnimatable facc>
                                        {animationBinding => (
                                            <Animate
                                                id={'scene-four-child'}
                                                name={'child'}
                                                visible={isVisibleTwo}
                                                animationBinding={animationBinding}
                                                when={[
                                                    [predicates.isVisible, animateIn],
                                                    [predicates.isHidden, animateOut]
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

export default SceneFour;

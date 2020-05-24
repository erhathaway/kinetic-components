import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import Rocket from '../assets/undraw_to_the_moon_v1mv_grouped_rocket.svg';
import Moon from '../assets/undraw_to_the_moon_v1mv_grouped_moon.svg';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from '../../src';
import {
    // StyledAnimatable,
    Button,
    // Code,
    // Playground,
    VisibleToggle
    // JSCSSButtons,
    // JSCSSToggle,
    // PlaygroundInstructions
} from '../components';

const StyledAnimatable = styled(Animatable)`
    // background-color: blue;
    display: flex;
    justify-content: center;
    width: 100%;
    // background-color: rgb(155, 255, 181);
`;

const SceneStyledAnimatable = styled(StyledAnimatable)`
    background-color: blue;
`;

const animateInCSS = (): AnimationResult => ['animate__animated', 'animate__fadeInRight'];
const animateOutCSS = (): AnimationResult => ['animate__animated', 'animate__fadeOutRight'];

const rocketSceneIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: ['-50%', 0],
        scale: [0.5, 1],
        opacity: [0, 1],
        easing: 'easeInBounce',
        duration: 200
    });

const rocketSceneOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '-50%'],
        scale: [1, 0.5],

        opacity: [1, 0],
        easing: 'linear',
        duration: 200
    });

const moonIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        scale: [0.5, 1],
        translateX: [0.9, 1],
        translateY: [0.7, 1],
        opacity: [0, 1],
        easing: 'easeInBounce',
        duration: 300,
        delay: 200
    });

const moonOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        scale: [1, 0.5],
        opacity: [1, 0],
        easing: 'easeOutCubic',
        duration: 200
    });

const rocketIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateY: ['-100%', 0],
        opacity: [0, 1],
        easing: 'easeInBounce',
        duration: 300,
        delay: 200
    });

const rocketOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateY: [0, '-100%'],
        opacity: [1, 0],
        delay: 500,
        easing: 'easeOutCubic',
        duration: 200
    });

// const SceneContainer = styled.div`
//     position: absolute;
// `;
const EntryButton = styled(Button)`
    position: relative;
    right: 50px;
    bottom: 50px;
    position: absolute;
    left: 0px;
    top: 29px;
`;

const SceneEntry: React.FC = () => (
    <>
        <VisibleToggle>
            {({isVisible, toggleVisible}) => (
                <>
                    <EntryButton onClick={toggleVisible}>{`${
                        isVisible ? 'hide' : 'show'
                    }`}</EntryButton>
                    <Animate
                        name={'test'}
                        visible={isVisible}
                        exitAfterChildFinish={['moon']}
                        when={[
                            [predicates.isVisible, rocketSceneIn],
                            [predicates.isHidden, rocketSceneOut]
                        ]}
                    >
                        <SceneStyledAnimatable>
                            {sceneBinding => (
                                <>
                                    <Animate
                                        id="moon"
                                        animationBinding={sceneBinding}
                                        // enterAfterParentFinish
                                        exitAfterChildFinish={['rocket']}
                                        name={'test'}
                                        visible={true}
                                        when={[
                                            [predicates.isVisible, moonIn],
                                            [predicates.isHidden, moonOut]
                                        ]}
                                    >
                                        <StyledAnimatable>
                                            {sceneBinding => (
                                                <>
                                                    <img
                                                        src={Moon}
                                                        alt="Moon"
                                                        style={{height: '300px', position: 'fixed'}}
                                                    />
                                                    <Animate
                                                        id="rocket"
                                                        animationBinding={sceneBinding}
                                                        // enterAfterParentFinish
                                                        name={'test'}
                                                        visible={true}
                                                        when={[
                                                            [predicates.isVisible, rocketIn],
                                                            [predicates.isHidden, rocketOut]
                                                        ]}
                                                    >
                                                        <StyledAnimatable>
                                                            <img
                                                                src={Rocket}
                                                                alt="Rocket"
                                                                style={{
                                                                    height: '300px',
                                                                    position: 'fixed'
                                                                }}
                                                            />
                                                        </StyledAnimatable>
                                                    </Animate>
                                                </>
                                            )}
                                        </StyledAnimatable>
                                    </Animate>
                                </>
                            )}
                        </SceneStyledAnimatable>
                    </Animate>
                </>
            )}
        </VisibleToggle>
    </>
);

export default SceneEntry;

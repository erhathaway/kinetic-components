import React, {useState} from 'react';
import anime from 'animejs';
import styled from 'styled-components';
import logger from 'beano';

// import Rocket from '../assets/undraw_to_the_moon_v1mv_grouped_rocket.svg';
import Moon from '../assets/undraw_to_the_moon_v1mv_grouped_moon.svg';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult, Group} from '../../src';
import {
    // StyledAnimatable,
    Button,
    // Code,
    // Playground,
    VisibleToggle,
    Grouping
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

const BoxAnimatable = styled(Animatable)`
    background-color: yellow;
    height: 30px;
    width: 20px;
`;

const SceneStyledAnimatable = styled(StyledAnimatable)`
    background-color: blue;
`;

// const animateInCSS = (): AnimationResult => ['animate__animated', 'animate__fadeInRight'];
// const animateOutCSS = (): AnimationResult => ['animate__animated', 'animate__fadeOutRight'];

const rocketSceneIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        // translateX: ['-50%', 0],
        scale: [0.5, 1],
        opacity: [0, 1],
        easing: 'linear',
        duration: 200
    });

const rocketSceneOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '-50%'],
        scale: [1, 0.5],

        opacity: [1, 0],
        easing: 'linear',
        duration: 400
    });

const moonIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        scale: [0.5, 1],
        translateX: [0.9, 1],
        translateY: [0.7, 1],
        opacity: [0, 1],
        easing: 'linear',
        duration: 300,
        delay: 200
    });

const moonOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        scale: [1, 0.9],
        opacity: [1, 0],
        translateY: ['0%', '30%'],
        easing: 'easeOutCubic',
        duration: 1200
    });

const rocketIn = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateY: ['-100%', 0],
        opacity: [0, 1],
        scale: [1.5, 1],

        easing: 'linear',
        duration: 300,
        delay: 200
    });

const rocketOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateY: [0, '-100%'],
        opacity: [1, 0],
        scale: [1, 1.8],
        // delay: 500,
        easing: 'easeOutCubic',
        duration: 1300
    });

// const SceneContainer = styled.div`
//     position: absolute;
// `;
const EntryButton = styled(Button)`
    // position: relative;
    right: 50px;
    bottom: 50px;
    position: relative;
    left: 0px;
    top: 29px;
`;

const SceneEntry: React.FC = () => {
    const [count, setCount] = useState(0);
    const incrementCount = (): void => setCount(count => count + 1);
    const decrementCount = (): void => setCount(count => (count > 0 ? count - 1 : count));
    console.log('count', count);
    return (
        <>
            <VisibleToggle>
                {({isVisible, toggleVisible}) => (
                    <>
                        <EntryButton onClick={toggleVisible}>{`${
                            isVisible ? 'hide' : 'show'
                        }`}</EntryButton>
                        <EntryButton onClick={incrementCount}>{`${'increment'}`}</EntryButton>
                        <EntryButton onClick={decrementCount}>{`${'decrement'}`}</EntryButton>

                        <Animate
                            name={'scene'}
                            visible={isVisible}
                            when={[
                                [predicates.isVisible, rocketSceneIn],
                                [predicates.isHidden, rocketSceneOut]
                            ]}
                        >
                            <SceneStyledAnimatable>
                                {sceneBinding => (
                                    <>
                                        <Grouping initialSize={1}>
                                            {({group}) => (
                                                <Group>
                                                    {group.map(item => (
                                                        <Animate
                                                            key={`${item.id}`}
                                                            {...sceneBinding}
                                                            logger={logger}
                                                            id="moon"
                                                            // enterAfterParentFinish
                                                            // exitAfterChildStart={['rocket']}
                                                            name={'moon'}
                                                            visible={true}
                                                            when={[
                                                                [predicates.isVisible, moonIn],
                                                                [predicates.isHidden, moonOut]
                                                            ]}
                                                        >
                                                            <BoxAnimatable />
                                                        </Animate>
                                                    ))}
                                                </Group>
                                            )}
                                        </Grouping>
                                    </>
                                )}
                            </SceneStyledAnimatable>
                        </Animate>
                    </>
                )}
            </VisibleToggle>
        </>
    );
};

export default SceneEntry;
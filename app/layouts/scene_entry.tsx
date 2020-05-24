import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import Rocket from '../assets/undraw_to_the_moon_v1mv_grouped_rocket.svg';
import Moon from '../assets/undraw_to_the_moon_v1mv_grouped_moon.svg';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from '../../src';
import {
    // StyledAnimatable,
    Button,
    Code,
    Playground,
    VisibleToggle,
    JSCSSButtons,
    JSCSSToggle,
    PlaygroundInstructions
} from '../components';

const StyledAnimatable = styled.div`
    background-color: blue;
    display: flex;
    justify-content: center;
    width: 100%;
    // background-color: rgb(155, 255, 181);
`;

const animateInCSS = (): AnimationResult => ['animate__animated', 'animate__fadeInRight'];
const animateOutCSS = (): AnimationResult => ['animate__animated', 'animate__fadeOutRight'];

const animateInJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: ['-50%', 0],
        opacity: [0, 1]
    });

const animateOutJS = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: `#${ctx.node.id}`,
        translateX: [0, '-50%'],
        opacity: [1, 0],
        easing: 'linear',
        duration: 200
    });

const SceneContainer = styled.div`
    position: absolute;
`;
const EntryButton = styled(Button)`
    position: relative;
    right: 50px;
    bottom: 50px;
`;

const SceneEntry: React.FC = () => (
    <>
        {/* <Playground> */}
        {/* <JSCSSToggle>
            {({isJS, setIsJS, setIsCSS}) => ( */}
        <>
            {/* <JSCSSButtons setIsJS={setIsJS} setIsCSS={setIsCSS} isJS={isJS} /> */}
            <VisibleToggle>
                {({isVisible, toggleVisible}) => (
                    <>
                        <EntryButton onClick={toggleVisible}>{`${
                            isVisible ? 'hide' : 'show'
                        }`}</EntryButton>
                        <Animate
                            name={'test'}
                            visible={isVisible}
                            when={[
                                [predicates.isVisible, animateInJS],
                                [predicates.isHidden, animateOutJS]
                            ]}
                        >
                            <StyledAnimatable>
                                {/* <div> */}
                                <h4>{`Look at me. I'm animated!`}</h4>
                                <img
                                    src={Moon}
                                    alt="Moon"
                                    style={{height: '300px', position: 'fixed'}}
                                />
                                <img
                                    src={Rocket}
                                    alt="Rocket"
                                    style={{height: '300px', position: 'fixed'}}
                                />
                                {/* </div> */}
                            </StyledAnimatable>
                        </Animate>
                    </>
                )}
            </VisibleToggle>
        </>
        {/* )}
        </JSCSSToggle> */}
        {/* </Playground> */}
    </>
);

export default SceneEntry;

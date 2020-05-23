// import React from 'react';

// import {Code} from '../components';

// const SceneSix: React.FC = () => (
//     <>
//         <Code>
//             {`
// import {predicates, Animate, AnimationCtx, AnimationResult} from 'kinetic-components';
// import anime from 'animejs';

// export default ({isVisible, customState, isBouncing, shouldBounce, animateBounce, styles}) => (
//     <Animate
//         visible={isVisible}
//         predicateState={customState}
//         triggerState={{isBouncing}}
//         when={[
//             [shouldBounce, animateBounce]
//             [predicates.isHidden, animateOut]
//             [predicates.isVisible, animateIn],
//         ]}
//     >
//         <Animatable styles={styles}>
//             <h4>Look at me. I can show, hide, and bounce!</h4>
//         </Animatable>
//     </Animate>
// );
// `}
//         </Code>
//     </>
// );

// export default SceneSix;

import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, AnimationCtx, AnimationResult, Predicate} from '../../src';
import {
    StyledAnimatable,
    Button,
    Code,
    Playground,
    VisibleToggle,
    JSCSSButtons,
    JSCSSToggle,
    PlaygroundInstructions,
    MoveToggle
} from '../components';

const Animatable = styled(StyledAnimatable)`
    background-color: rgb(155, 255, 181);
`;

const shouldWobble: Predicate = (_, {triggerState, visible}) => {
    return (visible && triggerState.wobble) || false;
};

const animateWobble = (): AnimationResult => ['animate__animated', 'animate__wobble'];

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

const SceneSix: React.FC = () => (
    <>
        <Code>
            {`
import {Animate, Animatable, predicates} from 'kinetic-components';

export default ({isVisible, animateIn, animateOut, styles}) => (
    <Animate
        visible={isVisible}
        when={[
            [predicates.isVisible, animateIn],
            [predicates.isHidden, animateOut]
        ]}
    >
        <Animatable styles={styles}>
            <h4>Look at me. I'm animated!</h4>
        </Animatable>
    </Animate>
);
`}
        </Code>
        <PlaygroundInstructions />
        <Playground>
            <MoveToggle>
                {({shouldMove, move}) => (
                    <JSCSSToggle>
                        {({isJS, setIsJS, setIsCSS}) => (
                            <>
                                <JSCSSButtons setIsJS={setIsJS} setIsCSS={setIsCSS} isJS={isJS} />
                                <VisibleToggle>
                                    {({isVisible, toggleVisible}) => (
                                        <>
                                            <Button onClick={toggleVisible}>{`${
                                                isVisible ? 'hide' : 'show'
                                            }`}</Button>
                                            <Button onClick={move}>wobble</Button>
                                            <Animate
                                                name={'test'}
                                                visible={isVisible}
                                                triggerState={{wobble: shouldMove}}
                                                when={[
                                                    [
                                                        [
                                                            predicates.wasPreviouslyVisible,
                                                            predicates.isVisible,
                                                            shouldWobble
                                                        ],
                                                        animateWobble
                                                    ],
                                                    [
                                                        [
                                                            predicates.wasPreviouslyHidden,
                                                            predicates.isVisible
                                                        ],
                                                        isJS ? animateInJS : animateInCSS
                                                    ],
                                                    [
                                                        [
                                                            predicates.wasPreviouslyVisible,
                                                            predicates.isHidden
                                                        ],
                                                        isJS ? animateOutJS : animateOutCSS
                                                    ]
                                                ]}
                                            >
                                                <Animatable>
                                                    <h4>{`Look at me. I'm animated!`}</h4>
                                                </Animatable>
                                            </Animate>
                                        </>
                                    )}
                                </VisibleToggle>
                            </>
                        )}
                    </JSCSSToggle>
                )}
            </MoveToggle>
        </Playground>
    </>
);

export default SceneSix;

import React from 'react';

import {Code} from '../components';

const SceneOne: React.FC = () => (
    <>
        <Code>
            {`
import {predicates, Animate, AnimationCtx, AnimationResult} from 'animated-components-react';
import anime from 'animejs';

const animateIn = (): AnimationResult => ['animate__animated', 'animate__fadeInRight'];

const animateOut = (ctx: AnimationCtx): AnimationResult =>
    anime({
        targets: \`#\${ctx.node.id}\`,
        translateX: ['50%', 0],
        opacity: [1, 0],
        easing: 'linear',
        duration: 200
    });

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
    </>
);

export default SceneOne;

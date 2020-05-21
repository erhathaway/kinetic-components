import React from 'react';

import {Code} from '../components';

const SceneOne: React.FC = () => (
    <>
        <Code>
            {`
import {predicates, Animate, AnimationCtx, AnimationResult} from 'animated-components-react';
import anime from 'animejs';

export default ({isVisible, customState, isBouncing, shouldBounce, animateBounce, styles}) => (
    <Animate
        visible={isVisible}
        predicateState={customState}
        triggerState={{isBouncing}}
        when={[
            [shouldBounce, animateBounce]
            [predicates.isHidden, animateOut]
            [predicates.isVisible, animateIn],
        ]}
    >
        <Animatable styles={styles}>
            <h4>Look at me. I can show, hide, and bounce!</h4>
        </Animatable>
    </Animate>
);
`}
        </Code>
    </>
);

export default SceneOne;

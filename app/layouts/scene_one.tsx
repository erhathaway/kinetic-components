import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import VisibleToggle from '../components/visible_toggle';
import Button from '../components/button';
import StyledAnimatable from '../components/animatable';

const Animatable = styled(StyledAnimatable)`
    background-color: rgb(155, 255, 181);
`;

const CodeBlock = styled(Highlight)`
    // border: 4px solid black;
    margin-bottom: 70px;
`;
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

const SceneOne: React.FC = () => (
    <>
        <CodeBlock language={'javascript'}>{`
import {Animate, Animatable, predicates} from 'animated-components-react';

export default ({isVisible, animateIn, animateOut}) => (
    <Animate
        visible={isVisible}
        when={[
            [predicates.isVisible, animateIn],
            [predicates.isHidden, animateOut]
        ]}
    >
    <Animatable>
        <h4>Look at me. I'm animated!</h4>
    </Animatable>
    </Animate>
);
`}</CodeBlock>
        <VisibleToggle>
            {({isVisible, toggleVisible}) => (
                <>
                    <Button onClick={toggleVisible}>{`${isVisible ? 'hide' : 'show'}`}</Button>
                    <Animate
                        name={'test'}
                        visible={isVisible}
                        when={[
                            [predicates.isVisible, animateIn],
                            [predicates.isHidden, animateOut]
                        ]}
                    >
                        <Animatable>
                            <h4>Look at me. I'm animated!</h4>
                        </Animatable>
                    </Animate>
                </>
            )}
        </VisibleToggle>
    </>
);

export default SceneOne;

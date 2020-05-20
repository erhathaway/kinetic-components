import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

import {predicates, Animate, AnimationCtx, AnimationResult} from '../../src';
import VisibleToggle from '../components/visible_toggle';
import Button from '../components/button';
import StyledAnimatable from '../components/animatable';

const Playground = styled.div`
    position: relative;
    padding: 20px;
    padding-bottom: 40px;
    border: 1px solid black;
    border-radius: 6px;
    background: lightgrey;
    height: 220px;
`;

const CodeContainer = styled.div`
    position: relative;
`;

const PlaygroundLabel = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 100px;
    height: 30px;
    // background-color: blue;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-bottom-left-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CodeLabel = styled(PlaygroundLabel)`
    border-color: white;
    color: white;
`;
const Animatable = styled(StyledAnimatable)`
    background-color: rgb(155, 255, 181);
`;

const CodeBlock = styled(Highlight)`
    margin-bottom: 20px;
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
        <CodeContainer>
            <CodeBlock language={'javascript'}>
                {`
import {Animate, Animatable, predicates} from 'animated-components-react';

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
            </CodeBlock>
        </CodeContainer>

        <Playground>
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
        </Playground>
    </>
);

export default SceneOne;

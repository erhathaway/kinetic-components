import React from 'react';
import anime from 'animejs';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from '../../src';
import VisibleToggle from '../components/visible_toggle';
import Button from '../components/button';

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
                    <Animatable
                        style={{
                            marginTop: '100px',
                            height: '150px',
                            width: '400px',
                            backgroundColor: 'Chartreuse',
                            border: '1px solid black',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h1>Look at me. I'm animated!</h1>
                    </Animatable>
                </Animate>
            </>
        )}
    </VisibleToggle>
);

export default SceneOne;

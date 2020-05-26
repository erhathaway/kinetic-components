/* eslint-disable react/prop-types */

import React from 'react';
import {AnimatableProps} from './types';
import {AnimationBinding} from '../dist/src';

const Animatable = React.forwardRef<HTMLDivElement, AnimatableProps>(function animatable(
    props,
    ref
) {
    if (!props.id) {
        throw new Error('Missing id');
    }
    // if (!props.parentState || !props.parentVisible || !props.notifyParentOfState) {
    //     throw new Error(
    //         'No animation binding prop found. This usually means this component (the animatable component) is not directly mounted under an animation component'
    //     );
    // }
    const hasAnimationBinding =
        !props.parentState || !props.parentVisible || !props.notifyParentOfState;
    const animationBinding = hasAnimationBinding
        ? ({
              parentState: props.parentState,
              parentVisible: props.parentVisible,
              notifyParentOfState: props.notifyParentOfState
          } as AnimationBinding)
        : undefined;

    return (
        <div style={props.style} id={props.id} ref={ref} className={props.className}>
            {props.children &&
            typeof props.children === 'function' &&
            hasAnimationBinding &&
            animationBinding
                ? props.children(animationBinding)
                : props.children
                ? props.children
                : null}
        </div>
    );
});

export default Animatable;

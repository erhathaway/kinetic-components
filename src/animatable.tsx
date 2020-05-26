/* eslint-disable react/prop-types */

import React from 'react';
import {AnimateableProps} from './types';

const Animatable = React.forwardRef<HTMLDivElement, AnimateableProps>(function animatable(
    props,
    ref
) {
    if (!props.id) {
        throw new Error('Missing id');
    }
    if (!props.animationBinding) {
        throw new Error(
            'No animation binding prop found. This usually means this component (the animatable component) is not directly mounted under an animation component'
        );
    }

    return (
        <div style={props.style} id={props.id} ref={ref} className={props.className}>
            {props.children && typeof props.children === 'function' && props.animationBinding
                ? props.children(props.animationBinding, props.parentState)
                : props.children
                ? props.children
                : null}
        </div>
    );
});

export default Animatable;

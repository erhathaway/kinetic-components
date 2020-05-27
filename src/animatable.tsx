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

    const moduleLogger = props.logger && props.logger.child('kinetic-components');
    const animatableLogger = moduleLogger && moduleLogger.child('Animatable Component');
    animatableLogger && animatableLogger.debug({...props}, 'Props');
    // if (!props.parentState || !props.parentVisible || !props.notifyParentOfState) {
    //     throw new Error(
    //         'No animation binding prop found. This usually means this component (the animatable component) is not directly mounted under an animation component'
    //     );
    // }
    const hasAnimationBinding =
        props.parentState !== undefined &&
        props.parentVisible !== undefined &&
        props.notifyParentOfState !== undefined;
    const animationBinding = hasAnimationBinding
        ? ({
              parentState: props.parentState,
              parentVisible: props.parentVisible,
              notifyParentOfState: props.notifyParentOfState
          } as AnimationBinding)
        : undefined;

    animationBinding &&
        animatableLogger &&
        animatableLogger.debug(animationBinding, 'animation binding');

    return (
        <div style={props.style} id={props.id} ref={ref} className={props.className}>
            {props.children && typeof props.children === 'function'
                ? // hasAnimationBinding &&
                  // animationBinding
                  props.children(animationBinding)
                : props.children
                ? props.children
                : null}
        </div>
    );
});

export default Animatable;

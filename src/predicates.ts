import {Predicate} from './types';

const justMounted: Predicate = (_, {prevVisible}) => prevVisible === undefined;
const wasPreviouslyVisible: Predicate = (_, {prevVisible}) => !!prevVisible;
const wasPreviouslyHidden: Predicate = (_, {prevVisible}) => !prevVisible;
const isVisible: Predicate = (_, {visible}) => visible;
const isHidden: Predicate = (_, {visible}) => !visible;

export default {
    justMounted,
    wasPreviouslyVisible,
    wasPreviouslyHidden,
    isVisible,
    isHidden
};

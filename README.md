# kinetic-components

Kinetic components helps you animate a single React component and orchestrate animations amongst a collection of React components.

Use any animation library you like - including raw CSS!

# Examples

All examples can be found in the playground at [https://erhathaway.github.io/kinetic-components/](https://erhathaway.github.io/kinetic-components/).

# TL;DR

Usage is describe in the playground ^

In short, the library works by having a `Animate` and `Animatable` component. The `Animate` component controls the `Animatable` component. You can style the `Animatable` component and children under it (like additional Animate - Animatable nestings). When you change the `Animates` `visible` prop, predicate functions in the `when` prop are evaluated and associated animation functions are run on the nested `Animate` components DOM element.

You can control how multiple `Animate - Animatable` pairings animate together using `animationBindings`. These allow you to do things like wait on children before leaving or wait on parents before entering.

Futhermore, you can do more than just animate enter and exit states. Using the custom `triggerState` prop you can provide additional predicate based animations that run on all sorts of state changes!

# API

### Animate

| prop                   | required | type                                                  | description                                                                                                                                                             | default     |
| ---------------------- | -------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| logger                 |          | `ILogger`                                             | A [Beano](https://github.com/erhathaway/beano) logger to get debugging info for this component                                                                          | `undefined` |
| visible                | x        | `boolean`                                             | The state that controls whether to show or hide the `Animatable` component                                                                                              |             |
| triggerState           |          | `object`                                              | An optional object that can be used to trigger animation runs. Shallow diffs are used to check for differences                                                          | undefined   |
| predicateState         |          | `any`                                                 | An optional state prop that will be passed as the first arg to predicate functions during an animation run                                                              | undefined   |
| when                   | x        | `Array<[Predicates | Predicate, PredicateAnimation]>` | The logic that has predicate - animationFn pairings                                                                                                                     |             |
| children               |
| unmountOnHide          |          | `true`                                                | A flag for control if the `Animatable` component should be unmounted from the DOM when it is no longer visible                                                          |
| id                     |          | `string`                                              | The element ID. This is required if you are referencing this component in another `Animate` component via props `enterAfterChildStart` or `enterAfterChildFinish`       | undefined   |
| animationBinding       |          | `AnimationBinding`                                    | The binding that connects multiple animations together. This is supplied by a higher level `Animate` or `Animatable` component via a FACC (Function as child component) | undefined   |
| enterAfterChildStart   |          | `string[]`                                            | The child ids which you want to wait for. These ids should match the ids passed to the child `Animate` component                                                        | undefined   |
| enterAfterChildFinish  |          | `string[]`                                            | The child ids which you want to wait for. These ids should match the ids passed to the child `Animate` component                                                        | undefined   |
| enterAfterParentStart  |          | `boolean`                                             | Whether to wait for the parent to fully start animating before animating                                                                                                | undefined   |
| enterAfterParentFinish |          | `boolean`                                             | Whether to wait for the parent to fully finish animating before animating                                                                                               | undefined   |

### Animatable

| prop  | required | type     | description                           | default     |
| ----- | -------- | -------- | ------------------------------------- | ----------- |
| style |          | `object` | React styles to pass to the component | `undefined` |

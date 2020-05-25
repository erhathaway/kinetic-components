# kinetic-components

Kinetic components helps you animate a single React component and orchestrate animations amongst a collection of React components.

Use CSS animations or any JS animation library you like!

**Update:** I'm actively looking for contributors. I would like to make this library more robust and finalize the API for a V1 release. The long term goal is to port this to web components and make this cross-framework compatible.

# Why

> Aren't there enough animation libraries already?

### Unopinonated animations

Kinetic Components isn't a normal animation library. It is more akin to a library that provides bindings so you can trigger state based animations using the animation library / method of your choice.

For example, libraries like [react-spring](https://github.com/react-spring/react-spring) force you to write your animations in terms of their API. This means you can't leverage existing CSS animations or great libraries like [animejs](https://github.com/juliangarnier/anime/) or [GSAP](https://github.com/greensock/GreenSock-JS/). Kinetic allows you to use these existing tools - simply provide an animation function that returns returns CSS class names to apply to an `Animatable` component or have the function take the `Animatable` component element reference and act on it directly.

### Low barrier to entry and easy maintenance

Existing React animation libraries try to do everything, as such they mix the logic of evaluating whether an animation should run with the logic of running an animation. Kinetic Components separates out the concerns of when to trigger an animation and how the animation works. Thus, the API size is not only reduced, but the code written with it is likely to be much more maintainable. Kinetic Components only asks you to define `trigger state` - state that triggers animation runs, `animation predicates` - functions that evaluate whether an animation should run, and `animation functions` - functions that perform the animation.

### Sensible API for JSX views

Existing React animation libraries have an incredibly large surface area. As such when you use their `render props` API to write the animation you end up with a huge number of props and clutter the JSX file. The resulting code is not very readable or expressive so it is common to opt for the component code with hooks instead. Component code is great, but it is a layer of indirection. Sometimes that can be good to hide implementation details, but if you want to express an application layout in a single file, its now obfuscating details that would be nice to have in one layout file.

# Examples

The best way to get a feel for Kinetic Components is to read through the docs and click the examples on the playground website: [https://erhathaway.github.io/kinetic-components/](https://erhathaway.github.io/kinetic-components/).

# TL;DR

Usage is described in the playground ^

In short, the library works by having an `Animate` and `Animatable` component. The `Animate` component controls the `Animatable` component. You can style the `Animatable` component and nest children under it (like additional Animate - Animatable nestings). When you change the `Animates` `visible` prop, predicate functions in the `when` prop are evaluated and associated animation functions are run on the nested `Animatable` component's DOM element.

You can control how multiple `Animate - Animatable` pairings animate together using `animationBindings`. These allow you to do things like wait on children before leaving or wait on parents before entering.

Futhermore, you can do more than just animate enter and exit states. Using the custom `triggerState` prop you can provide additional predicate based animations that run on all sorts of state changes!

# API

### Animate

| prop                   | required | type                                                            | description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| logger                 |          | `ILogger`                                                       | A [Beano](https://github.com/erhathaway/beano) logger to get debugging info for this component                                                                                                                                                                                                                                                                                                                                                                     |
| visible                | x        | `boolean`                                                       | The state that controls whether to show or hide the `Animatable` component                                                                                                                                                                                                                                                                                                                                                                                         |  |
| triggerState           |          | `object`                                                        | An optional object that can be used to trigger animation runs. Shallow diffs are used to check for differences                                                                                                                                                                                                                                                                                                                                                     |
| predicateState         |          | `any`                                                           | An optional state prop that will be passed as the first arg to predicate functions during an animation run                                                                                                                                                                                                                                                                                                                                                         |
| when                   | x        | `Array<[Predicates or Predicate, PredicateAnimation, Options]>` | The logic that has predicate - animationFn pairings. Options is an object of type `{key: string}`. The `key` is used to track if the same animation is applied twice in a row. Normally, animation libs and CSS animations would have a noop action b/c the transform is already applied. Kinetic handles this by doing a component unmount to clear the transforms then it runs the animation. If you want to avoid the unmount, don't pass in the optional `key` |  |
| children               |
| unmountOnHide          |          | `true`                                                          | A flag for control if the `Animatable` component should be unmounted from the DOM when it is no longer visible                                                                                                                                                                                                                                                                                                                                                     |
| id                     |          | `string`                                                        | The element ID. This is required if you are referencing this component in another `Animate` component via props `enterAfterChildStart` or `enterAfterChildFinish`                                                                                                                                                                                                                                                                                                  |
| animationBinding       |          | `AnimationBinding`                                              | The binding that connects multiple animations together. This is supplied by a higher level `Animate` or `Animatable` component via a FACC (Function as child component)                                                                                                                                                                                                                                                                                            |
| enterAfterChildStart   |          | `string[]`                                                      | The child ids which you want to wait for. These ids should match the ids passed to the child `Animate` component                                                                                                                                                                                                                                                                                                                                                   |
| enterAfterChildFinish  |          | `string[]`                                                      | The child ids which you want to wait for. These ids should match the ids passed to the child `Animate` component                                                                                                                                                                                                                                                                                                                                                   |
| enterAfterParentStart  |          | `boolean`                                                       | Whether to wait for the parent to fully start animating before animating                                                                                                                                                                                                                                                                                                                                                                                           |
| enterAfterParentFinish |          | `boolean`                                                       | Whether to wait for the parent to fully finish animating before animating                                                                                                                                                                                                                                                                                                                                                                                          |

### Animatable

| prop  | required | type     | description                           | default     |
| ----- | -------- | -------- | ------------------------------------- | ----------- |
| style |          | `object` | React styles to pass to the component | `undefined` |

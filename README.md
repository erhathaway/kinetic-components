# animated-components

Animated components helps you animate a single React component and orchestrate animations amongst a collection of React components.

Use any animation library you like - including raw CSS!

# Animate a single component (using animejs)

```jsx
import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from 'animated-components';
import anime from 'animejs';

const animateIn = (ctx: AnimationCtx): AnimationResult => anime({
    targets: `#${ctx.node.id}`,
    translateX: [0, 400],
    translateY: [0, 400],
    opacity: [1, 0]
})

const animateOut = (ctx: AnimationCtx): AnimationResult => anime({
    targets: `#${ctx.node.id}`,
    translateX: [400, 0],
    translateY: [400, 0],
    opacity: [0, 1]
})

const MyApp = () => (
    <VisibleToggle>
        {({isVisible, toggleVisible}) => (
            <>
                <Button onClick={toggleVisible}>{`toggle to: ${!isVisible}`}</Button>
                <Animate
                    visible={isVisible}
                    when={[
                        [predicates.isVisible, animateIn],
                        [predicates.isHidden, animateOut]
                    ]}
                >
                    <Animatable style={{height: '300px', width: '400px', backgroundColor: 'orange'}}>
                        <h1>Look at me move!</h1>
                    </Animatable>
                </Animate>
            </>
        )}
    </VisibleToggle>;
)
```

The code works, but the Readme is still a TODO. In the meantime, for usage check out [/app/layouts/index.tsx](/app/layouts/index.tsx)

import React from 'react';
import anime from 'animejs';
import styled from 'styled-components';

import {predicates, Animate, Animatable, AnimationCtx, AnimationResult} from '../../src';

const Button = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    margin: 10px;

    :hover {
        background-color: gray;
    }
    :active {
        background-color: yellow;
    }
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

const VisibleToggle: React.FC<{
    children: (args: {isVisible: boolean; toggleVisible: () => void}) => React.ReactElement; //JSX.Element[] | React.ReactElement | React.ReactChild; //React.ReactChildren; // | React.ReactElement | null | undefined;
}> = ({children}) => {
    const [isVisible, setVisible] = React.useState<boolean>(true);

    const toggleVisible = (): void => {
        setVisible(state => !state);
    };
    return children({toggleVisible, isVisible});
};

const Layout: React.FC = () => (
    <VisibleToggle>
        {({isVisible, toggleVisible}) => (
            <>
                <Button onClick={toggleVisible}>{`toggle to: ${!isVisible}`}</Button>
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
                            height: '150px',
                            width: '400px',
                            backgroundColor: 'blue',
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

export default Layout;

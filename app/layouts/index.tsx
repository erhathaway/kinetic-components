import React from 'react';
import styled from 'styled-components';

import SceneOne from './scene_one';

const Container = styled.div`
    height: calc(100vh - 120px);
    width: calc(100vw - 120px);
    // background-color: orange;
    overflow-y: scroll;
    font-family: 'Space Mono', monospace;
    padding: 60px;
`;

const Header = styled.div`
    color: brown;
    margin: 20px;
    max-width: 80%;
`;

const Messaging = styled.div`
    border: 1px solid black;
    border-radius: 7px;
    padding: 20px;
    color: white;
    max-width: 800px;
`;

const NavMenu = styled.nav``;

const NavLink = styled.a``;

const NavPages = styled.div`
    display: flex;
    flex-direction: column;
`;

const Scene = styled.div`
    margin-top: 150px;

    height: 400px;
`;

const Layout = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <h1>Animated Components</h1>
                <h3>
                    Animate a single React component or orchestrate animations among a collection of
                    React components.
                </h3>
                <Messaging></Messaging>
            </Header>
            <NavMenu>
                <NavLink href={'#scene-one'}>Single Component</NavLink>
            </NavMenu>
            <NavPages>
                <Scene id="scene-one">
                    <h3>Single component</h3>
                    <div style={{marginBottom: '30px'}}>
                        Animate a single component using the `Animate` and `Animatable` components
                    </div>
                    <div style={{marginBottom: '30px', borderBottom: '1px solid black'}} />
                    <SceneOne />
                </Scene>
                <Scene id="scene-two">
                    <SceneOne />
                </Scene>
            </NavPages>
        </Container>
    );
};

export default Layout;

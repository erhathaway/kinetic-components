import React from 'react';
import styled from 'styled-components';

import SceneOne from './scene_one';
import SceneTwo from './scene_two';
import SceneThree from './scene_three';
import SceneFour from './scene_four';
import SceneFive from './scene_five';

const Container = styled.div`
    display: flex;

    // height: calc(100vh - 120px);
    // width: calc(100vw - 120px);
    // // background-color: orange;
    // overflow-y: scroll;
    font-family: 'Space Mono', monospace;
    // padding: 60px;
`;

const Header = styled.div`
    // position: fixed;
    height: 100vh;
    color: brown;
    padding: 40px;
    max-width: 80%;
    color: rgb(119, 0, 119);
    background-color: rgb(68, 238, 170);
`;

const HeaderSubText = styled.h3`
    color: black;
`;

const Body = styled.div`
    height: calc(100vh - 120px);
    width: calc(100vw - 120px);
    // background-color: orange;
    overflow-y: scroll;
    // font-family: 'Space Mono', monospace;
    padding: 60px;
`;

// const Messaging = styled.div`
//     border: 1px solid black;
//     border-radius: 7px;
//     padding: 20px;
//     color: white;
//     max-width: 800px;
// `;

const NavMenu = styled.nav``;

const NavLink = styled.a``;

const NavPages = styled.div`
    display: flex;
    flex-direction: column;
`;

const Scene = styled.div`
    margin-top: 150px;

    height: 600px;
`;

const SceneTitle = styled.div`
    display: flex;
`;

const Colon = styled.h3`
    margin-left: 10px;
    color: blue;
`;
const SceneDescription = styled.div`
    margin-bottom: 30px;
`;

const SceneDivider = styled.div`
    margin-bottom: 30px;
    border-bottom: 1px solid black;
`;

const Layout = (): JSX.Element => {
    return (
        <Container>
            <Header>
                <h1>Animated Components</h1>
                <HeaderSubText>
                    Animate a single React component or orchestrate animations among a collection of
                    React components.
                </HeaderSubText>
            </Header>
            <Body>
                <NavMenu>
                    <NavLink href={'#scene-one'}>Single Component</NavLink>
                </NavMenu>
                <NavPages>
                    <Scene id="scene-five">
                        <SceneTitle>
                            <h3>Children of children:</h3>
                            <Colon>parent waits for child to exit</Colon>
                        </SceneTitle>
                        <SceneDescription>
                            The parent and child are bound together by passing the
                            `animationBinding` prop from the parent to the child. The parent is told
                            to wait for the child to finish leaving before starting to leave. This
                            is accomplished by passing the child id to the parent prop
                            `exitAfterChildFinish`. Note: This only works if the child has finished
                            animating in.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneFive />
                    </Scene>
                    <Scene id="scene-one">
                        <SceneTitle>
                            <h3>Single component</h3>
                        </SceneTitle>
                        <SceneDescription>
                            Animate a single component using the `Animate` and `Animatable`
                            components
                        </SceneDescription>
                        <SceneDivider />
                        <SceneOne />
                    </Scene>
                    <Scene id="scene-two">
                        <SceneTitle>
                            <h3>Parent and child:</h3>
                            <Colon>with no orchestration binding</Colon>
                        </SceneTitle>
                        <SceneDescription>
                            There is no orchestration binding between the two components. This means
                            the parent can leave at any time and the child can enter at any time.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneTwo />
                    </Scene>
                    <Scene id="scene-three">
                        <SceneTitle>
                            <h3>Parent and child:</h3>
                            <Colon>child waits for parent to enter</Colon>
                        </SceneTitle>
                        <SceneDescription>
                            The parent and child are bound together by passing the
                            `animationBinding` prop from the parent to the child. The child is told
                            to wait for the parent to finish entering before starting to enter via
                            the prop `enterAfterParentFinish`.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneThree />
                    </Scene>
                    <Scene id="scene-four">
                        <SceneTitle>
                            <h3>Parent and child:</h3>
                            <Colon>parent waits for child to exit</Colon>
                        </SceneTitle>
                        <SceneDescription>
                            The parent and child are bound together by passing the
                            `animationBinding` prop from the parent to the child. The parent is told
                            to wait for the child to finish leaving before starting to leave. This
                            is accomplished by passing the child id to the parent prop
                            `exitAfterChildFinish`. Note: This only works if the child has finished
                            animating in.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneFour />
                    </Scene>
                </NavPages>
            </Body>
        </Container>
    );
};

export default Layout;

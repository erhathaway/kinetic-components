import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

import SceneZero from './scene_zero';
import SceneOne from './scene_one';
import SceneTwo from './scene_two';
import SceneThree from './scene_three';
import SceneFour from './scene_four';
import SceneFive from './scene_five';
import SceneSix from './scene_six';

const VERTICAL_SCREEN_WIDTH = '1050px';
const Container = styled.div`
    display: flex;
    font-family: 'Space Mono', monospace;
    height: 100vh;
    overflow-y: scroll;

    @media (max-width: ${VERTICAL_SCREEN_WIDTH}) {
        flex-direction: column;
        overflow-y: scroll;
    }
`;

const Header = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: Propown;
    width: 50%;
    max-width: 550px;
    color: rgb(119, 0, 119);
    background-color: lightskyblue;

    @media (min-width: ${VERTICAL_SCREEN_WIDTH}) {
        height: 100vh;
    }
    @media (max-width: ${VERTICAL_SCREEN_WIDTH}) {
        max-width: 100%;
        width: 100%;
        position: relative;
    }
`;

const HeaderFiller = styled(Header)`
    position: relative;
    background-color: green;
`;

const HeaderBody = styled.div`
    padding: 40px;
    padding-top: 0px;
    @media (max-width: ${VERTICAL_SCREEN_WIDTH}) {
        // max-width: 400px;
        position: relative;
    }
`;

const HeaderTitle = styled.h1`
    // background-color: coral;
    display: flex;
    align-items: center;
    padding: 10px;
`;

const HeaderSubText = styled.div`
    font-size: 14px;
    color: black;
    padding-bottom: 20px;
    @media (max-height: 1000px) {
        font-size: 12px;
        padding-bottom: 5px;
    }
`;

const HeaderCodeBlock = styled(Highlight)`
    margin-top: 20px;
    margin-bottom: 10px;
`;

const CodeBlock = styled(Highlight)`
    margin-top: 20px;
    margin-bottom: 10px;
`;

const NavMenu = styled.nav`
    display: flex;
    flex-direction: column;
`;

const NavMenuText = styled.div`
    margin-top: 30px;
    margin-bottom: 10px;
    // background-color: Lavender;
    color: black;
    width: 190px;
    padding: 5px;
    font-size: 10px;
`;
const NavLink = styled.a`
    font-size: 12px;
    padding: 7px;
    border-radius: 5px;
    :hover {
        background-color: 46b1f3;
    }
`;

const NavPages = styled.div`
    display: flex;
    flex-direction: column;
`;

const Github = styled.div`
    height: 45px;
    // width: 100%;
    // background-color: Lavender;
    padding: 10px;
    padding-left: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #ffffdb;
    font-size: 12px;
    color: black;

    :hover {
        background-color: yellow;
    }
    // border-top: 1px solid black;
`;

const GithubText = styled.a`
    font-size: 12px;
    color: black !important;
    padding-left: 10px;
    padding-right: 30px;
    // text-decoration: none;
`;

const GithubIcon = styled.a`
    padding-left: 30px;
    padding-right: 30px;
    font-size: 20px;
    color: black !important;
    text-decoration: none;
`;

const Body = styled.div`
    width: calc(100vw - 120px);
    max-width: 580px;
    padding: 60px;

    @media (max-width: ${VERTICAL_SCREEN_WIDTH}) {
        max-width: 100%;
        position: relative;
    }
`;

const Scene = styled.div`
    padding-top: 25px;
    margin-bottom: 150px;
`;

const SceneTitle = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const SceneTitleMain = styled.h3`
    margin: 0px;
`;

const SceneTitleSub = styled.h3`
    margin: 0px;
    color: blue;
`;
const SceneDescription = styled.div`
    margin-bottom: 30px;
    font-size: 13px;
`;

const SceneDivider = styled.div`
    margin-bottom: 30px;
    border-bottom: 1px solid black;
`;

const Prop = styled.div`
    margin: 10px;
`;

const Layout = (): JSX.Element => {
    return (
        <Container>
            <HeaderFiller />
            <Header>
                <HeaderBody>
                    <HeaderTitle>
                        Kinetic Components{' '}
                        <GithubIcon
                            className="fab fa-github"
                            href="https://github.com/erhathaway/kinetic-components"
                        ></GithubIcon>
                    </HeaderTitle>
                    <HeaderSubText>
                        Animate a single React component or orchestrate animations among a
                        collection of React components.
                    </HeaderSubText>
                    <HeaderSubText>
                        Use CSS animations or your favorite JS animation library!
                    </HeaderSubText>
                    <HeaderCodeBlock language={'bash'}>
                        npm install kinetic-components --save
                    </HeaderCodeBlock>
                    <NavMenu>
                        <NavMenuText>Jump to an example:</NavMenuText>
                        <NavLink href={'#scene-zero'}>CSS or JS Animations</NavLink>
                        <NavLink href={'#scene-one'}>Single Component</NavLink>
                        <NavLink href={'#scene-two'}>Parent and child - no orchestration</NavLink>
                        <NavLink href={'#scene-three'}>
                            Parent and child - child waits for parent to enter
                        </NavLink>
                        <NavLink href={'#scene-four'}>
                            Parent and child - parent waits for child to exit
                        </NavLink>
                        <NavLink href={'#scene-five'}>Children of children</NavLink>
                        <NavLink href={'#scene-six'}>Custom predicates and trigger states</NavLink>
                    </NavMenu>
                </HeaderBody>
                <Github>
                    More at:
                    <GithubText href="https://github.com/erhathaway/kinetic-components">
                        github.com/erhathaway/kinetic-components
                    </GithubText>
                    {/* <GithubIcon
                        className="fab fa-github"
                        href="https://github.com/erhathaway/kinetic-components"
                    ></GithubIcon> */}
                </Github>
            </Header>
            <Body>
                <NavPages>
                    <Scene id="scene-zero">
                        <SceneTitle>
                            <SceneTitleMain>Use CSS or JS animations</SceneTitleMain>
                        </SceneTitle>
                        <SceneDescription>
                            Animations are controlled with the `when` prop. This props takes an
                            array of `predicate` - `animation function` pairs. The predicate
                            determines if the animation function will run for the given `visible`
                            prop.
                            <br />
                            <br />
                            The animation function has the signature:
                            <br />
                            <CodeBlock language={'typescript'} styles={{fontSize: '10px'}}>
                                {`(ctx: {node: HTMLElement}) => string | string[] | {finished: Promise}`}
                            </CodeBlock>
                            {` To use CSS animations return the className(s) you want appended to the
                            \`Animatable\` component's element.
                           `}
                            <br />
                            <br />
                            To use JS animations pass the HTML element into your animation library
                            of choice and return a promise that resolves when the animation is
                            finished.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneZero />
                    </Scene>
                    <Scene id="scene-one">
                        <SceneTitle>
                            <SceneTitleMain>Single component</SceneTitleMain>
                        </SceneTitle>
                        <SceneDescription>
                            Animate a single component using the `Animate` and `Animatable`
                            components. The `Animate` component controls the `Animatable` component.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneOne />
                    </Scene>
                    <Scene id="scene-two">
                        <SceneTitle>
                            <SceneTitleMain>Parent and child:</SceneTitleMain>
                            <SceneTitleSub>with no orchestration binding</SceneTitleSub>
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
                            <SceneTitleMain>Parent and child:</SceneTitleMain>
                            <SceneTitleSub>child waits for parent to enter</SceneTitleSub>
                        </SceneTitle>
                        <SceneDescription>
                            <b>Uses props: </b>
                            <Prop /> - animationBinding
                            <Prop />- enterAfterParentFinish
                            <br />
                            <br />
                            Using `animationBindings`, an `Animatable` can be bound to parent and
                            child animation contexts.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneThree />
                    </Scene>
                    <Scene id="scene-four">
                        <SceneTitle>
                            <SceneTitleMain>Parent and child:</SceneTitleMain>
                            <SceneTitleSub>parent waits for child to exit</SceneTitleSub>
                        </SceneTitle>
                        <SceneDescription>
                            <b>Uses props: </b>
                            <Prop /> - animationBinding <Prop />- exitAfterChildFinish
                        </SceneDescription>
                        <SceneDivider />
                        <SceneFour />
                    </Scene>
                    <Scene id="scene-five">
                        <SceneTitle>
                            <SceneTitleMain>Children of children:</SceneTitleMain>
                            <SceneTitleSub>everyone waits for everyone else</SceneTitleSub>
                        </SceneTitle>
                        <SceneDescription>
                            <b>Uses props: </b>
                            <Prop /> - animationBinding <Prop />- exitAfterChildFinish
                            <Prop />- enterAfterParentFinish
                        </SceneDescription>
                        <SceneDivider />
                        <SceneFive />
                    </Scene>
                    <Scene id="scene-six">
                        <SceneTitle>
                            <SceneTitleMain>Custom predicates and trigger states</SceneTitleMain>
                        </SceneTitle>
                        <SceneDescription>
                            The `Animate` component will run whenever the required `visible` prop or
                            optional `triggerState` prop changes. When the `Animate` component runs,
                            it iterates over the predicate - animationFn pairings in the `when`
                            prop, stopping at the first pairing whose predicate returns `true` and
                            then calling the associated animationFn.
                            <br />
                            <br />
                            The `Animate` component also takes an optional `predicateState` prop.
                            This prop holds state that is passed into the predicate when called.
                            <br />
                            <br />
                            The predicate function has the signature:
                            <br />
                            <CodeBlock language={'typescript'} styles={{fontSize: '8px'}}>
                                {`(predicateState: any, {triggerState, visible}: {triggerState: any; visible: boolean}) => boolean`}
                            </CodeBlock>
                            <br />
                            <br />A shallow diff is done on the `triggerState` with each change to
                            determine if the Animate component should run. By coupling custom
                            trigger states with custom predicates you can make animations that go
                            beyond the normal show and hide animations. For example, you can add
                            micro bounce effects when some scene data changes.
                        </SceneDescription>
                        <SceneDivider />
                        <SceneSix />
                    </Scene>
                </NavPages>
            </Body>
        </Container>
    );
};

export default Layout;

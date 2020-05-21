import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100px;
    height: 30px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 1px solid black;
    border-left: 1px solid black;

    background-color: yellow;
    position: absolute;
    right: 0px;
    top: 0px;

    display: flex;
`;

const Button = styled.div`
    height: 100%;
    width: 50px;
    background-color: ${props =>
        (props as {isActive: boolean}).isActive ? 'cornflowerblue' : '#ffffdb'};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 10px;
    :hover {
        cursor: pointer;
        background-color: coral;
    }
    :active {
        background-color: cornflowerblue;
    }
    ${props =>
        (props as {isActive: boolean}).isActive && '    box-shadow: inset 1px 1px 3px #222;    '}
`;
const JSButton = styled(Button)`
    border-bottom-left-radius: 6px;
`;
const CSSButton = styled(Button)`
    border-top-right-radius: 6px;
`;

/**
 *
 * A component to toggle visibility
 */
const ToggleJSCSS: React.FC<{
    isJS: boolean;
    setIsJS: () => void;
    setIsCSS: () => void;
    // eslint-disable-next-line
}> = ({isJS, setIsJS, setIsCSS}) => {
    return (
        <Container>
            <JSButton onClick={setIsJS} isActive={isJS}>
                JS
            </JSButton>
            <CSSButton onClick={setIsCSS} isActive={!isJS}>
                CSS
            </CSSButton>
        </Container>
    );
};

export default ToggleJSCSS;

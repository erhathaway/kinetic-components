import React from 'react';
import styled from 'styled-components';

const Instructions = styled.div`
    margin: 40px 124px 40px 149px;
    font-size: 12px;
    border-left: 1px solid black;
    padding-left: 28px;
`;

const PlaygroundInstructions: React.FC = () => (
    <Instructions>
        Click the 'show' and 'hide' buttons to run the animation. Toggle 'js' and 'css' to change
        (behind the scenes) how the animation is executed
    </Instructions>
);

export default PlaygroundInstructions;

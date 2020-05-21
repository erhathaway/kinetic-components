import React from 'react';
import styled from 'styled-components';

const Instructions = styled.div`
    margin: 40px 20px 40px 20px;
    // max-width: 500px;
    font-size: 12px;
    border-left: 1px solid gray;
    padding-left: 28px;
    color: gray;
`;

const PlaygroundInstructions: React.FC = () => (
    <Instructions>
        {`Click the 'show' and 'hide' buttons to run the animation. Toggle 'js' and 'css' to change
        (behind the scenes) how the animation is executed via CSS or JS animate[In|Out] functions`}
    </Instructions>
);

export default PlaygroundInstructions;

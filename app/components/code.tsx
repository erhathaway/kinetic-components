import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

const CodeContainer = styled.div`
    position: relative;
    // overflow-y: scroll;
`;
const CodeBlock = styled(Highlight)`
    margin-bottom: 20px;
    border-radius: 5px;
`;

// eslint-disable-next-line
const Code: React.FC<{children: string}> = ({children}) => {
    return (
        <CodeContainer>
            <CodeBlock language={'typescript'}>{children}</CodeBlock>
        </CodeContainer>
    );
};

export default Code;

import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight.js';

const CodeContainer = styled.div`
    position: relative;
`;
const CodeBlock = styled(Highlight)`
    margin-bottom: 20px;
`;

// eslint-disable-next-line
const Code: React.FC<{children: string}> = ({children}) => {
    return (
        <CodeContainer>
            <CodeBlock language={'javascript'}>{children}</CodeBlock>
        </CodeContainer>
    );
};

export default Code;
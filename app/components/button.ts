import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: cornflowerblue;
    margin: 10px;

    :hover {
        cursor: pointer;
        background-color: coral;
    }
    :active {
        background-color: yellow;
    }
`;

export default Button;

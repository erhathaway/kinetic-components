import styled from 'styled-components';

const Button = styled.div`
    width: 140px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: cornflowerblue;
    margin: 10px;
    box-shadow: 4px 4px 0 #222;
    // border-bottom: 8px solid black;
    font-size: 13px;

    :hover {
        cursor: pointer;
        background-color: coral;
    }
    :active {
        background-color: yellow;
    }
`;

export default Button;

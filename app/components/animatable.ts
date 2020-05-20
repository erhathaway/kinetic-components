import styled from 'styled-components';

import {Animatable} from '../../src';

const StyledAnimatable = styled(Animatable)`
    margin-top: 100px;
    height: 100px;
    width: 200px;
    background-color: Chartreuse;
    border: 1px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 2px 2px 0 #222;
`;

export default StyledAnimatable;

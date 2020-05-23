import React from 'react';

/**
 *
 * A component to js or css animation usage
 */
const MoveToggle: React.FC<{
    children: (args: {shouldMove: boolean; move: () => void}) => React.ReactElement;
}> = ({children}) => {
    const [shouldMove, moveState] = React.useState<boolean>(true);

    const move = (): void => {
        moveState(s => !s);
        // setTimeout(() => {
        //     moveState(false);
        // }, 1300);
    };

    return children({shouldMove, move});
};

export default MoveToggle;

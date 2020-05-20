import React from 'react';

/**
 *
 * A component to toggle visibility
 */
const VisibleToggle: React.FC<{
    children: (args: {isVisible: boolean; toggleVisible: () => void}) => React.ReactElement;
}> = ({children}) => {
    const [isVisible, setVisible] = React.useState<boolean>(true);

    const toggleVisible = (): void => {
        setVisible(state => !state);
    };
    return children({toggleVisible, isVisible});
};

export default VisibleToggle;

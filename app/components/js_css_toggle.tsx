import React from 'react';

/**
 *
 * A component to js or css animation usage
 */
const JSCSSToggle: React.FC<{
    children: (args: {
        isJS: boolean;
        setIsJS: () => void;
        setIsCSS: () => void;
    }) => React.ReactElement;
}> = ({children}) => {
    const [isJS, setVisible] = React.useState<boolean>(true);

    const setIsJS = (): void => {
        setVisible(isJSVisible => (isJSVisible ? isJSVisible : !isJSVisible));
    };

    const setIsCSS = (): void => {
        setVisible(isJSVisible => (isJSVisible ? !isJSVisible : isJSVisible));
    };

    return children({isJS, setIsJS, setIsCSS});
};

export default JSCSSToggle;

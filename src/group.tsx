import React, {useEffect} from 'react';
import {ILogger} from 'beano';

type Co = React.ReactElement;

type ChildrenState = {
    oldChildren: Co[];
    newChildren: Co[];
    leaving: Record<string, Co>;
    entering: Record<string, Co>;
    noChange: Record<string, Co>;
    renderChildren: Co[];
};
const calcChildStates = (
    oldC: ChildrenState['oldChildren'],
    newC: ChildrenState['newChildren']
): ChildrenState => {
    // const oldChildKeyMap = (oldC).map(c => ({[c.key as string]: c}))
    // const newChildKeyMap = (newC).map(c => ({[c.key as string]: c}))

    const oldKeys = oldC.map(c => c.key);
    const newKeys = newC.map(c => c.key);

    const leaving = oldC
        .filter(c => !newKeys.includes(c.key))
        .reduce((acc, c) => {
            acc[c.key as string] = c;
            return acc;
        }, {} as Record<string, Co>);
    const entering = newC
        .filter(c => !oldKeys.includes(c.key))
        .reduce((acc, c) => {
            acc[c.key as string] = c;
            return acc;
        }, {} as Record<string, Co>);
    const noChange = newC
        .filter(c => oldKeys.includes(c.key))
        .reduce((acc, c) => {
            acc[c.key as string] = c;
            return acc;
        }, {} as Record<string, Co>);

    const oldLength = oldC.length;
    const newLength = newC.length;
    const renderChildren =
        oldLength > 0
            ? oldC.reduce((acc, c, i) => {
                  // acc.push();
                  acc.push(c);
                  const newChildAtPosition = newC[i];
                  if (newChildAtPosition && c.key !== newChildAtPosition.key) {
                      acc.push(newChildAtPosition);
                  }
                  if (newLength > oldLength && i === oldLength - 1) {
                      const additionalChildren = newC.slice(i + 1);
                      acc.push(...additionalChildren);
                  }
                  return acc;
              }, [] as Co[])
            : newC;
    return {
        oldChildren: oldC,
        newChildren: newC,
        leaving,
        entering,
        noChange,
        renderChildren
    };
};
const Group = ({
    children,
    logger
}: {
    children: React.ReactElement[];
    logger?: ILogger;
}): React.ReactElement => {
    const moduleLogger = logger && logger.child('kinetic-components');
    const l = moduleLogger && moduleLogger.child('AnimateGroup Component');
    // const childKeys = Array.isArray(children) ? children.map(c => c.key) : children;
    const [childrenState, setChildrenState] = React.useState<ChildrenState>({
        oldChildren: [],
        newChildren: children,
        leaving: {},
        entering: children.reduce((acc, c) => {
            acc[c.key as string] = c;
            return acc;
        }, {} as Record<string, Co>),
        noChange: {},
        renderChildren: children
    });
    useEffect(() => {
        // console.log('Child change noticed', children.map(c => c.key).join(''));
        // const cc = calcChildStates(childrenState.oldChildren, childrenState.newChildren);
        // console.log(
        //     'children',
        //     'entering',
        //     cc.entering,
        //     'nochange',
        //     cc.noChange,
        //     'leaving',
        //     cc.leaving
        // );
        setChildrenState(state => calcChildStates(state.newChildren, children));
    }, [children.map(c => c.key).join('')]);

    // const keys = Object.keys(children);
    // console.log(keys, childrenState);

    // const oldLength = childrenState.oldChildren.length;
    // const newLength = childrenState.newChildren.length;
    // const zip =
    //     oldLength > 0
    //         ? childrenState.oldChildren.reduce((acc, c, i) => {
    //               // acc.push();
    //               acc.push(c);
    //               const newChildAtPosition = childrenState.newChildren[i];
    //               if (c.key !== newChildAtPosition.key) {
    //                   acc.push(newChildAtPosition);
    //               }
    //               if (newLength > oldLength && i === oldLength - 1) {
    //                   const additionalChildren = childrenState.newChildren.slice(i + 1);
    //                   acc.push(...additionalChildren);
    //               }
    //               return acc;
    //           }, [] as Co[])
    //         : children;

    // console.log('zip', zip);
    const notifyOfFinishedWithAnimation = (key: string): void => {
        // console.log('Notified!!!');
        setChildrenState(state => {
            const existingChildren = state.oldChildren.filter(c => c.key !== key);
            return {
                ...state,
                oldChildren: existingChildren
            };
        });
    };

    l && l.debug({numberOfChildren: childrenState.renderChildren.length}, 'Showing children');
    // console.log('Showing ', childrenState.renderChildren.length);
    return (
        <div>
            {childrenState.renderChildren.map(c => {
                // console.log('child', c);
                return React.cloneElement(c, {
                    beforeUnmount: notifyOfFinishedWithAnimation,
                    visible: childrenState.leaving[c.key as string] ? false : true
                });
            })}
        </div>
    );
    // return children;
    // return children.map(c =>
    //     React.cloneElement(c, {
    //         visible: childrenState.leaving[c.key as string] ? false : true
    //     })
    // );
};

export default Group;

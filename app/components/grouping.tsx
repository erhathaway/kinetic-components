import React from 'react';

type GroupItem = {id: number};

type GroupingFACC = {
    group: GroupItem[];
    addToGroup: (item: Partial<GroupItem>) => void;
    removeFromGroup: (groupItemId: number) => void;
};
type GroupingProp = {
    initialSize: number;
    children?:
        | (<P, T extends string>(groupingFacc: GroupingFACC) => any)
        | React.ReactElement
        | Element;
};
// eslint-disable-next-line
const Grouping: React.FC<GroupingProp> = ({children, initialSize}) => {
    const [group, setGroup] = React.useState<GroupItem[]>(
        Array(initialSize)
            .fill(0)
            .map((_, i) => ({
                id: i + 1
            }))
    );

    console.log('GROUPS', group);

    const addToGroup = (item: Partial<GroupItem>): void => {
        setGroup(g => [...g, {...item, id: g.length + 1}]);
    };
    const removeFromGroup = (groupItemId: number): void => {
        setGroup(g => g.filter(f => f.id !== groupItemId));
    };

    return (
        <>
            {children && typeof children === 'function'
                ? children({group, addToGroup, removeFromGroup})
                : children}
        </>
    );
};

export default Grouping;

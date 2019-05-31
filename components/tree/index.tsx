import * as React from "react";
import "./style/index.less";

export enum TreeNodeType{
    /**
     * 树根节点
     */
    ROOT= "root",
    /**
     * 树干节点
     */
    TRUNK= "trunk",
    /**
     * 树叶节点
     */
    LEAF= "leaf",
}

interface IRowProps {

}

interface IRowState {

}

export default class Tree extends React.Component<IRowProps, IRowState> {
    /**
     * render
     */
    public render() {
        const {children} = this.props;
        return <ul className="zw-tree">{children}</ul>;
    }
}

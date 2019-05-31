import * as React from "react";
import {TreeNodeType} from "./index";
import "./style/index.less";

interface IRowProps {
    type?: TreeNodeType;
    text: string;
    id: string;
    icon?: string;
    expanded?: boolean;
    checked?: boolean;
    onExpand?: (expanded: boolean) => void;
}

interface IRowState {

}

export default class TreeNode extends React.Component<IRowProps, IRowState> {

    public onExpand() {
        const {expanded, onExpand} = this.props;
        if (typeof onExpand === "function") {
            onExpand(!expanded);
        }
    }

    /**
     * render
     */
    public render() {
        const {id, text: text, children, expanded} = this.props;

        return (
            <li>
                <span className={"icon " + (expanded === true ? "collapse" : "expand")} onClick={this.onExpand} />
                <span>{text}</span>
                {children !== undefined && expanded === true ? <ul className="zw-tree">{children}</ul> : null}
            </li>
            );
    }
}

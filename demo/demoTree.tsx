import * as React from "react";
import { Col, Row, Tree, TreeNode } from "../components";

export default class DemoRow extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <p>树：</p>
                <Tree>
                    <TreeNode id="1" text="1" />
                    <TreeNode id="2" text="2">
                        <TreeNode id="2-1" text="2-1" />
                        <TreeNode id="2-2" text="2-2">
                            <TreeNode id="2-2-1" text="2-2-1" />
                            <TreeNode id="2-2-2" text="2-2-2" />
                        </TreeNode>
                    </TreeNode>
                    <TreeNode id="3" text="3">
                        <TreeNode id="3-1" text="3-1" />
                        <TreeNode id="3-2" text="3-2">
                            <TreeNode id="3-2-1" text="3-2-1" />
                            <TreeNode id="3-2-2" text="3-2-2" >
                            <TreeNode id="3-2-2-1" text="3-2-2-1" />
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                </Tree>
            </div>
        );
    }
}

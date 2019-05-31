import * as React from "react";
import Col from "../components/col";
import Row from "../components/row";

export default class DemoRow extends React.Component<any, any> {
    public render() {
        return (
            <div><Row gutter={10}>
                <Col span={{md: 6, sm: 10, lg: 4}} style={{backgroundColor: "red"}}><div>左边</div></Col>
                <Col span={{md: 6, sm: 2, lg: 8}} style={{backgroundColor: "green"}}><div>右边</div></Col>
                </Row></div>
        );
    }
}

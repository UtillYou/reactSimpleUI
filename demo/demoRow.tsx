import * as React from "react";
import Col from "../components/col";
import Row from "../components/row";

export default class DemoRow extends React.Component<any, any> {
    public render() {
        return (
            <div><Row gutter={10}>
                <Col span={{md: 6, sm: 10}} style={{backgroundColor: "red"}}><div>sfasf</div></Col>
                <Col span={{md: 6, sm: 2}} style={{backgroundColor: "green"}}><div>sfasf</div></Col>
                </Row></div>
        );
    }
}

import * as React from "react";
import ReactDOM from "react-dom";
import DemoRow from "./demoRow";
import DemoTree from "./demoTree";

ReactDOM.render(

  (<div>
    <DemoRow />
    <DemoTree />
  </div>),

  document.getElementById("app"),
);

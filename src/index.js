import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import { authService } from "fbase";

console.log(authService);

ReactDOM.render(<App />, document.getElementById("root"));

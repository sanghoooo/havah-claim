import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./index.scss";

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(
	<RecoilRoot>
		<App />
	</RecoilRoot>
);

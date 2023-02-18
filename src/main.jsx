import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<RecoilRoot>
		<App />
	</RecoilRoot>
);

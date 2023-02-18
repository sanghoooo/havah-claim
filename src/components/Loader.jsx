import { classBind } from "../utils/util";
import "./Loader.scss";

function Loader({ black }) {
    return <div className={classBind("lds-dual-ring", black && "black")}></div>
} 

export default Loader;
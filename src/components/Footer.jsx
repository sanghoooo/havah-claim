import "./Footer.scss";
import logo from "../assets/logo.svg";
import { COPYRIGHT, EXTERNAL } from "../utils/const";
import Links from "./Links";

function Footer() {
    return (
        <footer>
            <img src={logo}
                className="logo"
                alt="logo"
            />
            <p className="copyright">{COPYRIGHT}</p>
            <Links list={EXTERNAL}
                className="footer" 
            />
        </footer>
    )
}

export default Footer;
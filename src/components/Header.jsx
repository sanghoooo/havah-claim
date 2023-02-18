import "./Header.scss"
import logo from "../assets/logo.svg"
import { accountState } from "../recoil/atom";
import { useRecoilValue } from "recoil";
import Button from "./Button"
import { useWallet } from "../utils/wallet";

function Header() {
    const { address } = useRecoilValue(accountState);
    const { connect, disconnect } = useWallet();

    return (
        <header>
            <img src={logo} 
                className="logo" 
                alt="logo"
            />
            {address &&
                <>
                    <p>{address}</p>
                    <Button mint lined small
                        title="DISCONNECT"
                        onClick={() => disconnect(true)}
                    />
                </>
            }
            {!address &&
                <Button mint filled small
                    title="CONNECT"
                    onClick={() => connect()}
                />
            }
        </header>
    )
}

export default Header;
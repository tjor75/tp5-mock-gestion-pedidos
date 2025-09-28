import logo from "../../assets/logo.svg";
import NewOrderModal from "../NewOrderModal";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <img src={logo} />
            <nav><ul>
                <li><NewOrderModal /></li>
            </ul></nav>
        </header>
    );
}
import NewOrderModal from "../NewOrderModal";
import OrderFilter from "../OrderFilter";
import logo from "../../assets/logo.svg";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <img src={logo} />
            <nav><ul>
                <li><NewOrderModal /></li>
                <li><OrderFilter /></li>
            </ul></nav>
        </header>
    );
}
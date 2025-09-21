import logo from "../../assets/logo.svg";
import NewOrderModal from "../NewOrderModal";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <img src={logo} />
            <nav>
                <input type="checkbox" id="nav-toggle" />
                <label htmlFor="nav-toggle">MENU</label>
                <ul>
                    <li><NewOrderModal /></li>
                </ul>
            </nav>
        </header>
    );
}
import React, {ReactElement} from 'react';
import UserPanel from "./UserPanel";
import {RegLoginCallback} from "./RegLoginWindow";
import {AppStateContext} from "../../contexts/AppContext";
import { useHistory } from "react-router-dom";

interface IHeaderProps {
    isLogged: boolean,
    login?: string
    basketSize?: number
    onLogin: RegLoginCallback
    onSingUp: RegLoginCallback
}

interface EmptyProps {

}

const Header: React.FC<EmptyProps> = (props: EmptyProps): ReactElement => {
    let history = useHistory();

    const appContext = React.useContext(AppStateContext);
    return (
        <header>
            <div className="header__logo">
                <a onClick={() => history.push("/")}>TOOL SHOP </a>
            </div>
            <div className="header__address">
                Address
            </div>
            <div className="header__call">
                <ul>
                    <li className="header__call_phone">+7 (499) 567-78-65</li>
                    <li className="header__call_phone">8 800 570-77-77</li>
                    <li className="header__call_phone_notice">Call is free</li>
                    <li className="header__call_worktime">05:00AM – 10:00PM</li>
                </ul>
            </div>
            <UserPanel/>
            <div className="header__cart">
                <span>
                    <a onClick={() => history.push("basket")}><i className="fas fa-shopping-cart"> {appContext.basket?.length || 0} items</i></a>
                </span>
                <p className=".header__cart_total">
                    Total: &euro;0
                </p>
            </div>
        </header>
    );
};

export default Header;
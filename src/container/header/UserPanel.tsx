import React, {ReactElement} from "react";
import Header from "./Header";
import RegLoginWindow, {RegLoginCallback} from "./RegLoginWindow";
import {AppStateContext} from "../../contexts/AppContext";
import {IAppState} from "../../stores/AppState";

interface IProps {
    isLogged: boolean
    login ?: string
    onLogin: RegLoginCallback
    onSingUp: RegLoginCallback
    logout: () => void
}

interface IState {
    showModal: boolean
    modalWindowCallback: RegLoginCallback
    modalTitle: string
}

class UserPanel extends React.Component<{}, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            modalWindowCallback: props.onLogin,
            modalTitle: "",
        };
        this.showWindow.bind(this);
        this.closeWindow.bind(this);
    }

    static contextType = AppStateContext;

    showWindow(title: string, callback: RegLoginCallback) {
        this.setState({
            showModal: true,
            modalTitle: title,
            modalWindowCallback: callback,
        })
    }

    closeWindow() {
        this.setState({
            showModal: false
        })
    }

    render() {
        const appState: IAppState = this.context!;

        let modalWindow = null;
        if (this.state.showModal) {
            modalWindow = <RegLoginWindow
                submitCallback={this.state.modalWindowCallback}
                title={this.state.modalTitle}
                closeWindow={this.closeWindow.bind(this)}
            />;
        }
        if (appState.isLogged) {
            return (
                <div>
                    <label> {appState.email} </label>
                    <LogoutButton logout={appState.logout}/>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div>
                        <LoginButton showWindow={this.showWindow.bind(this)} callback={appState.onLogin}/>
                        <SingUpButton showWindow={this.showWindow.bind(this)} callback={appState.onSingUp}/>
                    </div>
                    {modalWindow}
                </React.Fragment>

            );
        }
    }
}

interface ISingUpProps {
    callback: RegLoginCallback
    showWindow: (title: string, callback: RegLoginCallback) => void
}

const SingUpButton: React.FC<ISingUpProps> = (props: ISingUpProps): ReactElement => {
    return (
        <div className="header__login">
            <button onClick={() => props.showWindow("Sing Up", props.callback)}>
                Sing Up
            </button>
        </div>
    );
};

interface ILogoutButtonProps {
    logout: () => void
}

const LogoutButton: React.FC<ILogoutButtonProps> = (props: ILogoutButtonProps): ReactElement => {
    const dd = () => {
        console.log("From loggout");
        props.logout()
    };
    return (
        <div className="header__login">
            <button onClick={() => props.logout()}>
                Logout
            </button>
        </div>
    );
};

interface ILoginProps {
    callback: RegLoginCallback
    showWindow: (title: string, callback: RegLoginCallback) => void
}

const LoginButton: React.FC<ILoginProps> = (props: ILoginProps): ReactElement => {
    return (
        <div className="header__login">
            <button onClick={() => props.showWindow("Login", props.callback)}>
                Login
            </button>
        </div>
    );
};

export default UserPanel;
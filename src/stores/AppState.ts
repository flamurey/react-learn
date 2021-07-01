import {IUserCredentials, RegLoginCallback, IRegLoginResponse} from "../container/header/RegLoginWindow";
import ToolApi, {IUser} from "../services/ToolApi";
import {readCookie, deleteCookie} from "./cookie";


type Handler = (newState: IAppState) => void

interface IAppStateController {
    subscribe(handler: Handler): void

    changeAppState(newState: IAppState): void
}

export const AppStateController: IAppStateController = new class implements IAppStateController {
    private subcriptions: Handler[] = [];

    changeAppState(newState: IAppState): void {
        this.subcriptions.forEach(handler => handler(newState))
    }

    subscribe(handler: (newState: IAppState) => void): void {
        this.subcriptions.push(handler)
    }

};

interface BasketItem {

}

interface Order {

}

export interface IAppState {
    isLogged: boolean
    email?: string
    orders?: Order[]
    basket?: BasketItem[]
    onLogin: RegLoginCallback
    onSingUp: RegLoginCallback
    logout: () => void
}

export class AppState implements IAppState {
    email ?: string;
    isLogged: boolean = false;
    onLogin: RegLoginCallback = async (uc: IUserCredentials) => {
        let user = await ToolApi.findUser(uc.email);
        let response;
        if (user) {
            if (user.password === uc.password) {
                response = Promise.resolve({
                    success: true
                } as IRegLoginResponse);
                const newState = Object.assign({}, this, {
                    isLogged: true,
                    email: user.email,
                    password: user.password,
                });
                AppStateController.changeAppState(newState)
                document.cookie = `email=${user.email}`
            } else {
                response = Promise.resolve({
                    success: false,
                    text: "Wrong password",
                } as IRegLoginResponse)
            }
        } else {
            response = Promise.resolve({
                success: false,
                text: `User with login ${uc.email} not exist`,
            } as IRegLoginResponse)
        }
        return response
    };
    logout = () => {
        const newState = Object.assign({}, this, {
            isLogged: false,
            email: '',
            password: '',
        });
        deleteCookie("email");
        AppStateController.changeAppState(newState)
    };
    onSingUp: RegLoginCallback = async (uc: IUserCredentials) => {
        let existedUser = await ToolApi.findUser(uc.email);
        if (existedUser) {
            return Promise.resolve({
                success: false,
                text: `User with email ${uc.email} already existed`,
            } as IRegLoginResponse)
        }
        let user = await ToolApi.createUser({
            email: uc.email,
            password: uc.password,
            isLogged: false,
        });
        let response;
        if (user) {
            response = Promise.resolve({
                success: true
            } as IRegLoginResponse)
        } else {
            response = Promise.resolve({
                success: false,
                text: `Some error happens`,
            } as IRegLoginResponse)
        }
        return response
    };
    orders?: Order[];
    basket ?: BasketItem[];
}

export function loadAppStore(): Promise<IAppState> {
    const login = readCookie("email");
    if (login) {
        return ToolApi
            .findUser(login)
            .then((user: IUser | null) => {
                let appState = new AppState();
                if (user) {
                    appState.isLogged = true;
                    appState.email = user.email;
                }
                return appState;
            })
    }
    return Promise.resolve(new AppState())
}
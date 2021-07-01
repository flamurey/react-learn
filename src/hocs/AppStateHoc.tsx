import React from "react";
import {AppState, AppStateController, IAppState, loadAppStore} from "../stores/AppState";
import {AppStateContext} from "../contexts/AppContext";



const initialAppState = loadAppStore();

export function withAppState<T> (Child: React.ComponentType<T>) {
    return class WithAppState extends React.Component<T, IAppState> {
        constructor(props: T) {
            super(props);
            this.state = new AppState();
            initialAppState.then(ap => this.setState(ap));
            AppStateController.subscribe((newState: IAppState) => {
                this.setState(newState)
            })
        }
        render() {
            return (
                <AppStateContext.Provider value={this.state}>
                    <Child {...(this.props as T)}/>
                </AppStateContext.Provider>
            );
        }
    }
};
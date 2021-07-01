import {createContext} from "react";
import {AppState, IAppState} from "../stores/AppState";

export const AppStateContext = createContext<IAppState>(new AppState());
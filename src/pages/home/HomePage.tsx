import React from 'react';
import Header from "../../container/header/Header";
import {withAppState} from "../../hocs/AppStateHoc";
import {AppState} from "../../stores/AppState";


interface IProps {
}

interface IState {
}

class HomePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Header/>
        );
    }
}

const homePageWithAppState = withAppState(HomePage);

export default homePageWithAppState;
import React from 'react';
import Header from "../../container/header/Header";
import {withAppState} from "../../hocs/AppStateHoc";

interface IProps {
}

interface IState {
}

class BasketPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <h1>This is basket</h1>
            </React.Fragment>
        );
    }
}
const basketPageWithAppState = withAppState(BasketPage);

export default basketPageWithAppState;
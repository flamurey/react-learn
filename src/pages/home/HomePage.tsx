import React from 'react';
import Header from "../../container/header/Header";


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

export default HomePage;
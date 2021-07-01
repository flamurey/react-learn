import React, {ReactElement} from "react";


export interface IUserCredentials {
    email: string
    password: string
}

export interface IRegLoginResponse {
    success: boolean
    text?: string
}

export type RegLoginCallback = (d: IUserCredentials) => Promise<IRegLoginResponse>

interface IRegLoginProps {
    title: string
    submitCallback: RegLoginCallback,
    closeWindow: () => void
}

interface IState {
    email: string
    password: string
    warnMessage?: string
}

class RegLoginWindow extends React.Component<IRegLoginProps, IState> {
    constructor(props: IRegLoginProps) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailChange(event: React.SyntheticEvent) {
        let target = event.target as HTMLInputElement;
        this.setState({email: target.value});
    }

    handlePasswordChange(event: React.SyntheticEvent) {
        let target = event.target as HTMLInputElement;
        this.setState({password: target.value});
    }

    submit() {
        this.props.submitCallback(this.state).then((res: IRegLoginResponse) => {
            if (res.success) {
                this.props.closeWindow()
            } else {
                this.setState({
                    warnMessage: res.text
                })
            }
        })
    }

    render() {
        return (
            <div id="registration-form-container">
                <div id="registration-form">
                    <h1>{this.props.title}</h1>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="test" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                    </div>
                    <div>
                        <label>{this.state.warnMessage}</label>
                    </div>
                    <div>
                        <button onClick={() => this.submit()}>Ok</button>
                        <button onClick={() => this.props.closeWindow()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegLoginWindow
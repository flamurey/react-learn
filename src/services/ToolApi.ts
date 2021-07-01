
export interface IUser {
    isLogged: boolean
    email: string
    password: string
}

export interface IToolApi {
   findUser(email: string): Promise<IUser|null>
   createUser(user: IUser): Promise<IUser>
}

class ToolApiService implements IToolApi {
    private jsonServerUrl = `http://localhost:3000/`;

    constructor() {
    }

    private async getRequest(api: string): Promise<any> {
        let url = this.jsonServerUrl + api;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    }



    findUser(email: string): Promise<IUser|null> {
        return this.getRequest(`users?email=${email}`).then(users => {
            if (users.length > 0) {
                return users[0] as IUser
            } else {
                return null
            }
        });
    }

    async createUser(user: IUser): Promise<IUser> {
        let response = await fetch(`${this.jsonServerUrl}users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            return response.json().then(user => user as IUser);
        } else {
            return Promise.reject("Error HTTP: " + response.status);
        }
    }
}

const ToolApi: IToolApi = new ToolApiService();

export default ToolApi
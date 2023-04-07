import {User} from "./IUser";

export interface Badge {
    id: number;
    name: string;
    obtained_at: string;
    user?: User;
}
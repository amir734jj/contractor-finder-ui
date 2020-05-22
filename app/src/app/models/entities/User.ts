import {Role} from '../RoleEnum';
import {Photo} from './Photo';

export default class User {
    id: string;
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    role: Role;
    photo: Photo;
}

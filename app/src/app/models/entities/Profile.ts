import {Role} from '../RoleEnum';
import Contractor from './Contractor';

export class Profile {
  name: string;
  email: string;
  role: Role;
  phoneNumber: string;
  description: string;
  photo: string;
  contractor?: Contractor;
}

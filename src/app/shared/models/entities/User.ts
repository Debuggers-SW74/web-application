import { Role } from '../enum/role';

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserInformation {
  name: string;
  phoneNumber: string;
  termsConditions: boolean;
  information: boolean;
}

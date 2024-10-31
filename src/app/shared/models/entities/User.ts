export interface User {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export interface UserRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Authenticate {
  email: string;
  password: string;
}

export interface UserInformation {
  name: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  termsConditions: boolean;
  information: boolean;
}

export interface Profile {
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthenticateModel {
  email: string;
  password: string;
}

export interface RegisterModel extends AuthenticateModel {
  name: string;
}

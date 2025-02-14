import { BaseFilter } from "./base_interface";

export interface UserRequest {
  email: string;
  fullname: string;
  password: string;
  phone: string;
}

export interface UserRequestUpdate {
    email?: string | undefined;
    fullname?: string | undefined;
    password?: string | undefined;
    phone?: string | undefined;
  }

export interface UserFilter extends BaseFilter {
    email?: string | undefined;
    fullname?: string | undefined;
    phone?: string | undefined;
  }

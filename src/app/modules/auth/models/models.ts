export interface ILoginPayload {
  password: string,
  username: string,
}

export interface IToken {
  token: string
}

export interface IAuthResponse {
  status: boolean,
  message: string,
}

export interface IRegistryPayload {
  email: string | null,
  firstName: string  | null,
  lastName: string  | null,
  password: string | null,
  patronymic: string | null,
  phoneNumber: string | null,
  username: string | null,
}

export type TRegistryData = IRegistryPayload & {password_confirm: string | null};

export const initRegistryFormData: TRegistryData = {
  email: null,
  firstName: null,
  lastName: null,
  password: null,
  patronymic: null,
  phoneNumber: null,
  username: null,
  password_confirm: null
}
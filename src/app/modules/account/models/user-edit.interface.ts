export interface IUserEdit {
  "username": string | null,
  "lastName": string | null,
  "firstName": string | null,
  "patronymic": string | null,
  "email": string | null,
  "phoneNumber": string | null,
}

export const initialUserEditData: IUserEdit = {
  username: null,
  lastName: null,
  firstName: null,
  patronymic: null,
  email: null,
  phoneNumber: null,

}
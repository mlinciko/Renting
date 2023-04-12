export interface IAddress {
  id: number,
  city: {id: number, name: string},
  houseNumber: string | number,
  street: {id: number, name: string},
  region: {id: number, name: string},
}
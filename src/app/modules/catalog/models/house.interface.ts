export interface IHouse {
  address: {
    city: {id: number, name: string}
    houseNumber: number,
    id: number,
    region: {id: number, name: string},
    street: {id: number, name: string},
  }
  buildingYear: number,
  elevator: boolean,
  houseMaterial: string
  housingType: string,
  id: number
  numberOfApartmentProperties: number,
  numberOfFloors: number,
  oneLineAddress: string,
}
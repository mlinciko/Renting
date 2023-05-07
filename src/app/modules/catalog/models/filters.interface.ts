export interface IFilters {
  type: string | null,
  priceFrom: number | null,
  priceTo: number | null,
  city: number | null,
  rating: number | null,
  search: string | null,
}

export const defaultFilters: IFilters = {
  type: null,
  priceFrom: null,
  priceTo: null,
  city: null,
  rating: null,
  search: null,
}
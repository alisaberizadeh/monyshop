export interface ICat {
  id: number
  name: string
  created_at: string
  updated_at: string
}
export interface IProduct {
  id: number
  name: string
  description: string
  image: string
  price: number
  discount: number
  quantity: number
  category_id: number
  created_at: string
  updated_at: string
}
export interface IPropsProduct {
  id: number
  name: string
  image: string
  price: number
  category: number
  quantity: number
}
export interface ICategury {
  id: number
  name: string
  created_at: string
  updated_at: string
}

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

export interface IComment {
  id: number
  user_id: number
  product_id: number
  comment: string
  created_at: string
  updated_at: string
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  is_admin: number
  credit: number
  phone: string
  city: string
  address: string
  remember_token: string
  created_at: string
  updated_at: string
}
export interface IUser {
  name: string;
  email: string;
  credit: number;
  phone: string | null;
  city: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  id: number;
}
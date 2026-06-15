export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  location: string;
  distance: string;
  image: string;
  categories?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  totalPrice: number;
  status: 'Processing' | 'Delivery' | 'Delivered';
  createdAt: string;
}

export interface CartItem {
  id: string;
  restaurantId: string;
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartGroup {
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
}

import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  restaurantId: string | null;
  items: CartItem[];
  addToCart: (restaurantId: string, item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  restaurantId: null,
  items: [],
  addToCart: (restaurantId, item) =>
    set((state) => {
      // Jika ganti restoran, reset keranjang lama
      const isNewRestaurant = state.restaurantId !== restaurantId;
      const currentItems = isNewRestaurant ? [] : state.items;

      const existingItem = currentItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          restaurantId,
          items: currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        restaurantId,
        items: [...currentItems, { ...item, quantity: 1 }],
      };
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    })),
  clearCart: () => set({ restaurantId: null, items: [] }),
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));

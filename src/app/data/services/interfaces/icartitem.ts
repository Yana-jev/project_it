// src/app/interfaces/cart-item.interface.ts

import { Wine } from "./wine"; 

// cart-item.interface.ts
export interface CartItem {
   id_cart_item?: number;
   cart_id: number;
   wine_id: number;
   quantity: number;
   price_at_purchase: number;
   created_at: string;
   updated_at: string;
}

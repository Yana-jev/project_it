// src/app/interfaces/cart.interface.ts

import { User } from './iuser';
import { CartItem } from './icartitem'; 

export interface Cart {
id_cart: number;
user_id: number;   
status: 'active' | 'completed' | 'cancelled';
created_at: string;
updated_at: string;
}

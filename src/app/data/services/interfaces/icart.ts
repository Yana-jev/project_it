import { CartItem } from './icartitem';

export interface Cart {
items: CartItem[];
totalPrice: number;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './interfaces/icartitem'; 

@Injectable({
providedIn: 'root',
})

export class CartService {
   private apiUrl = 'http://localhost:3000/carts'; // Путь к API для корзины
   
   constructor(private http: HttpClient) {}
   
   // Получаем корзину пользователя
   getCart(): Observable<CartItem[]> {
      return this.http.get<CartItem[]>(this.apiUrl, {
         withCredentials: true, // Учитываем куки для авторизации
      });
   }
   
   // Создаём корзину, если её нет
   createCart(): Observable<any> {
      return this.http.post<any>(this.apiUrl, {}, {
         withCredentials: true, // Учитываем куки для авторизации
      });
   }
   
   // Добавить товар в корзину
   addItemToCart(wineId: number, quantity: number): Observable<CartItem> {
      return this.http.post<CartItem>(`${this.apiUrl}/add`, { wineId, quantity }, {
         withCredentials: true, // Учитываем куки для авторизации
      });
   }
   
   // Обновить количество товара в корзине
   updateCartItemQuantity(wineId: number, quantity: number): Observable<CartItem> {
      return this.http.patch<CartItem>(`${this.apiUrl}/update`, { wineId, quantity }, {
         withCredentials: true, // Учитываем куки для авторизации
      });
   }
   
   removeItemFromCart(wineId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/remove/${wineId}`, {
         withCredentials: true,
      });
   }
   
   // Очистить корзину
   clearCart(): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/clear`, {
         withCredentials: true, // Учитываем куки для авторизации
      });
   }
   }
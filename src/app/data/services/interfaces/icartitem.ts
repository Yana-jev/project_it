export interface CartItem {
  wineId: number;  // ID вина
  wineName: string; // Название вина
  quantity: number; // Количество
  price: number;    // Цена за единицу
  totalPrice: number; // Общая стоимость
  imageUrl: string;   // URL изображения
}

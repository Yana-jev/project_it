export interface  Wine {
   id_wine: number,
   wine_name: string;
   bodega_name?: string,
   variedad?: string,
   year?: number,
   cantidad?: number,
   aroma?: string,
   maridaje?: string,
   price: number;
   color: string;
   type: string;
   sugar: string;
   image_url: string;
   description: string,
   wine_des_en?: string; 
   wine_des_ru?: string; 
   volumen?: string,

}
export interface WineFilterCriteria {
   color?: string;
   type?: string;
   maridaje?: string;
   aroma?: string;
   price?: string;
}

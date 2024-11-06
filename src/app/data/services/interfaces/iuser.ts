// src/app/interfaces/user.interface.ts

export interface User {
   id_user: number;          
   email: string;            
   roles: string[];          
   photo?: string;          
   created_at: string;       
   updated_at: string;       
}
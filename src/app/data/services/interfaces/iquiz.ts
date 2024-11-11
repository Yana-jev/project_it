import { Wine } from "./wine";

export interface QuizOption {
answer: string;
score: number;  
}


export interface QuizQuestion {
question: string;            
options: QuizOption[];    
image: string; 
}


export interface QuizResult {
wines: Wine[];  
}


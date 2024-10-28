import { Wine } from "./wine";

export interface QuizOption {
answer: string;
score: number;  
}

// Интерфейс для вопроса
export interface QuizQuestion {
question: string;            
options: QuizOption[];       
}


export interface QuizResult {
wines: Wine[];  
}

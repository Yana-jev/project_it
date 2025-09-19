export interface QuizOption {
  key: string;          // Испанское значение, которое отправляется на сервер
  translateKey: string; // Ключ для ngx-translate
}

export interface QuizQuestion {
  key: string;
  imageUrl: string;
  optionsKey?: QuizOption[]; 
  questionKey: string;   
}


export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    key: 'colorOrType',
    questionKey: 'QUIZ.Q1.QUESTION',
    optionsKey: [
      { key: 'tinto', translateKey: 'QUIZ.Q1.OPTIONS.RED' },
      { key: 'blanco', translateKey: 'QUIZ.Q1.OPTIONS.WHITE' },
      { key: 'espumoso', translateKey: 'QUIZ.Q1.OPTIONS.SPARKLING' }
    ],
    imageUrl: 'assets/img/v1.jpg'
  },
  {
    key: 'maridaje',
    questionKey: 'QUIZ.Q2.QUESTION',
    optionsKey: [], // заполняется динамически после выбора первого вопроса
    imageUrl: 'assets/img/v10.jpg'
  },
  {
    key: 'aroma',
    questionKey: 'QUIZ.Q3.QUESTION',
    optionsKey: [], // заполняется динамически после выбора первого вопроса
    imageUrl: 'assets/img/v7.jpg'
  },
  {
    key: 'price',
    questionKey: 'QUIZ.Q4.QUESTION',
    optionsKey: [
      { key: 'menos de 15 euros', translateKey: 'QUIZ.Q4.OPTIONS.UNDER_15' },
      { key: '15-20 euros', translateKey: 'QUIZ.Q4.OPTIONS.FROM_15_TO_20' },
      { key: 'más de 20 euros', translateKey: 'QUIZ.Q4.OPTIONS.ABOVE_20' }
    ],
    imageUrl: 'assets/img/v8.jpg'
  }
];

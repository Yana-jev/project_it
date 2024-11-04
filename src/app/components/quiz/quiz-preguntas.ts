import { QuizQuestion } from "../../data/services/interfaces/iquiz";

export const questions: QuizQuestion[] = [
{
   question: '¿Qué tipo de vino prefieres?',
   image: 'assets/img/v1.jpg', 
   options: [
      { answer: 'Tinto', score: 1 },
      { answer: 'Blanco', score: 2 },
      { answer: 'Rosado', score: 3 },
      { answer: 'Espumoso', score: 4 }
   ]
},
{
   question: '¿Con qué tipo de comida planeas acompañar el vino?',
   image: 'assets/img/v2.jpg', 
   options: [
      { answer: 'Carne roja', score: 1 },
      { answer: 'Pescado o mariscos', score: 2 },
      { answer: 'Verduras y ensaladas', score: 3 },
      { answer: 'Postres', score: 4 }
   ]
},
{
   question: '¿Cuál es tu sabor preferido?',
   image: 'assets/img/v3.jpg', 
   options: [
      { answer: 'Dulce', score: 1 },
      { answer: 'Ácido', score: 2 },
      { answer: 'Amargo', score: 3 },
      { answer: 'Salado', score: 4 }
   ]
},
{
   question: '¿Qué tan importante es para ti el origen del vino?',
   image: 'assets/img/v4.jpg', 
   options: [
      { answer: 'Muy importante, prefiero vinos de regiones específicas', score: 1 },
      { answer: 'Algo importante, pero no decisivo', score: 2 },
      { answer: 'No me importa, solo busco buen sabor', score: 3 }
   ]
},
{
   question: '¿Cuál es tu nivel de experiencia con el vino?',
   image: 'assets/img/v5.jpg', 
   options: [
      { answer: 'Soy un experto', score: 1 },
      { answer: 'Tengo conocimientos básicos', score: 2 },
      { answer: 'Soy principiante', score: 3 },
      { answer: 'No tengo experiencia', score: 4 }
   ]
},
{
   question: '¿Qué tipo de ambiente prefieres para disfrutar del vino?',
   image: 'assets/img/v6.jpg', 
   options: [
      { answer: 'Una cena elegante', score: 1 },
      { answer: 'Una reunión informal con amigos', score: 2 },
      { answer: 'En casa, solo o con mi pareja', score: 3 },
      { answer: 'En una celebración o fiesta', score: 4 }
   ]
},
{
   question: '¿Te gusta probar vinos con sabores inusuales?',
   image: 'assets/img/v7.jpg', 
   options: [
      { answer: 'Sí, me encanta explorar nuevos sabores', score: 1 },
      { answer: 'A veces, depende del día', score: 2 },
      { answer: 'Prefiero los sabores clásicos y tradicionales', score: 3 }
   ]
},
{
   question: '¿Qué tan dulce prefieres tu vino?',
   image: 'assets/img/v8.jpg', 
   options: [
      { answer: 'Muy dulce', score: 1 },
      { answer: 'Moderadamente dulce', score: 2 },
      { answer: 'Poco dulce', score: 3 },
      { answer: 'No me gusta el vino dulce', score: 4 }
   ]
},
{
   question: '¿Te importa la cantidad de taninos en el vino?',
   image: 'assets/img/v9.jpg', 
   options: [
      { answer: 'Sí, prefiero vinos con poco tanino', score: 1 },
      { answer: 'Me gustan los taninos moderados', score: 2 },
      { answer: 'No, no me doy cuenta de eso', score: 3 }
   ]
},
{
   question: '¿Cuál es tu momento favorito para disfrutar de una copa de vino?',
   image: 'assets/img/v10.jpg', 
   options: [
      { answer: 'Durante una cena', score: 1 },
      { answer: 'En una celebración', score: 2 },
      { answer: 'Al final de un largo día', score: 3 },
      { answer: 'En una cata de vinos', score: 4 }
   ]
},
];

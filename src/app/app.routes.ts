import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { CartComponent } from './components/cart/cart.component';
import { EventDetailComponent } from './event-detail/event-detail.component';




export const routes: Routes = [
   {path: '',  component: HeaderComponent, children:[
      { path: '', component: HomeComponent},

      { path: 'home', component: HomeComponent},
      { path: 'events', component: EventsComponent},
      { path: 'tienda', component: TiendaComponent},
      { path: 'cart', component: CartComponent },
      { path: 'quiz', component: QuizComponent },
      {path: 'addEvent', component: AddEventComponent},
      { path: 'event-detail/:id', component: EventDetailComponent }

   ]
},

   { path: 'register', component: RegisterComponent},
   { path: 'login', component: LoginComponent },


   

];

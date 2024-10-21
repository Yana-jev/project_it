import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';



export const routes: Routes = [
   {path: '',  component: HeaderComponent, children:[

      { path: 'home', component: HomeComponent},
      { path: 'events', component: EventsComponent},
   ]
},

   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent},

   

];

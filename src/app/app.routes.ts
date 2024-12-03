import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CartComponent } from './components/cart/cart.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { WineDetailComponent } from './components/wine-detail/wine-detail.component';
import { QuiizComponent } from './components/quiiiz/quiiiz.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { BodegaDetailComponent } from './components/bodega-detail/bodega-detail.component';




export const routes: Routes = [
   {path: '',  component: HeaderComponent, children:[
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'events', component: EventsComponent},
      { path: 'tienda', component: TiendaComponent},
      { path: 'cart', component: CartComponent },
      { path: 'event-detail/:id', component: EventDetailComponent },
      { path: 'wine/:id', component: WineDetailComponent},
      { path: 'bodegas', component: BodegasComponent},
      { path: 'bodega-detail/:id', component: BodegaDetailComponent },
      {path: 'quiiz', component: QuiizComponent}

   ]
},

   { path: 'register', component: RegisterComponent},
   { path: 'login', component: LoginComponent },


   

];

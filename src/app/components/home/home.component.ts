import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { EventsComponent } from "../events/events.component";

@Component({
  selector: 'home',
  standalone: true,
  imports: [LoginComponent, EventsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

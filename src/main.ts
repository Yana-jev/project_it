import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTQ2eGducjUxNjgzMnFyNHJ4Y3Vxd29mIn0.sKUheGxgdU-PXpQ5392pyw';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

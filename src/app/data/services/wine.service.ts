import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wine} from './interfaces/wine';



@Injectable({
providedIn: 'root'
})
export class WineService {

baseApiUrl = 'http://localhost:3000/wine'

http: HttpClient = inject(HttpClient);


filterWines(params: any): Observable<Wine[]> {
const queryParams = new URLSearchParams();

Object.keys(params).forEach((key) => {
   if (Array.isArray(params[key])) {

      queryParams.append(key, params[key].join(','));
   } else if (params[key]) {
      queryParams.append(key, params[key]);
   }
});

return this.http.get<Wine[]>(`${this.baseApiUrl}/filter?${queryParams.toString()}`, {
   withCredentials: true,
});
}


getWine(): Observable<Wine[]>{
return this.http.get<Wine[]>(`${this.baseApiUrl}`, { withCredentials: true }) 
}
addWine(eventData: FormData): Observable<Wine> {
return this.http.post<Wine>(this.baseApiUrl, eventData, { withCredentials: true });
}


updateWine(id: number, eventData: FormData): Observable<Wine> {
return this.http.put<Wine>(`${this.baseApiUrl}/${id}`, eventData, { withCredentials: true });
}

getWineById(id: string):Observable<Wine>{
return this.http.get<Wine>(`${this.baseApiUrl}/${id}`, { withCredentials: true }) 
}

deleteWine(id: number): Observable<any> {
return this.http.delete(`${this.baseApiUrl}/${id}`, { withCredentials: true });
}

constructor() { }
}

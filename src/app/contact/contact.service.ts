import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private Api = 'https://mailthis.to/MyForm';

  constructor(private http: HttpClient) { }

  postMessage(input: any) {
    return this.http.post(this.Api, input, { responseType: 'text' }).pipe(
      (
        (response) => {
          return response;
        }
      ),
      (error: any) => {
        return error;
      }
    )
  }
}

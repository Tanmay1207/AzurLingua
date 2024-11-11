import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';
import { IPaymentResponse } from '../model/paymentresponse';
 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;
  lang  = environment.lang;

 constructor(private http: HttpClient) {

  const langAbbreviationsArray = ['en', 'fr', 'es', 'de']; // Example array
  const baseHref = document.querySelector('base')?.getAttribute('href');

  // Extract language abbreviation
  const langAbbreviation = baseHref?.split('/')[1];

  if (langAbbreviation && langAbbreviationsArray.includes(langAbbreviation)) {
    this.lang = langAbbreviation;
  }
  else{
    this.lang  = environment.lang;
  }
  console.log("*****************LANG HEADER ********************************"+ this.lang);
  }

 // Example GET request
 getAllCountries(): Observable<Country[]> { 
   let api:string = environment.apiUrl+'/payments/allcountry';
   return this.http.get<any>(api);
 } 

  processPayment(paymentDto: any): Observable<IPaymentResponse> {
    const headers = new HttpHeaders({     
      'lang': this.lang
    });
    let api:string  = environment.apiUrl+'/payments';
    return this.http.post<IPaymentResponse>(api, paymentDto, { headers });;
  }
 
}

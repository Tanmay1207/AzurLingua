import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../model/course';
 

import { environment } from 'src/environments/environment';
import { CourseInformation } from '../model/coursedetail';
 
 

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
 
   apiUrl = environment.apiUrl+'/courses';
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
  get(): Observable<ICourse[]> {
    const headers = new HttpHeaders({     
      'lang': this.lang
    });
    return this.http.get<any>(`${this.apiUrl}`, { headers });;
  }

  getCouseDetail(id: string): Observable<CourseInformation> {
    const headers = new HttpHeaders({     
      'lang': this.lang
    });
    return this.http.get<CourseInformation>(`${this.apiUrl}/${id}`, { headers });;
  }
}

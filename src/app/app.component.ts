import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azurelingua';
  lang = environment.lang;
  constructor(
    public translate: TranslateService  
  ) {
    translate.addLangs(['en', 'nl']);

    // Fetch base href
    const langAbbreviationsArray = ['en', 'fr', 'es', 'de']; // Example array
    const baseHref = document.querySelector('base')?.getAttribute('href');

    // Extract language abbreviation
    const langAbbreviation = baseHref?.split('/')[1];

    if (langAbbreviation) {
      if (langAbbreviationsArray.includes(langAbbreviation)) {
        console.log('********************************Language Abbreviation:', langAbbreviation);
        translate.setDefaultLang(langAbbreviation);
     
      }
      else {
        translate.setDefaultLang(this.lang);    
        
      }
    }
    else {
      translate.setDefaultLang(this.lang);
       
 
    }
  }
}

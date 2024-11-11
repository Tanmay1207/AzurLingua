import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './courses/filter/filter.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './courses/home/home.component';
import { DetailComponent } from './courses/detail/detail.component'; // Import ReactiveFormsModule
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient , HttpClientModule} from '@angular/common/http';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoadingInterceptor } from './services/loading.interceptor';
import { RegisterComponent } from './registration/register/register.component';
import { PersonalInformationComponent } from './registration/personal-information/personal-information.component';
import { CourseregistrationComponent } from './registration/courseregistration/courseregistration.component';
import { SummaryComponent } from './registration/summary/summary.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuoteComponent } from './registration/quote/quote.component';
import { EnabledDatesDirective } from './app-enabled-dates.directive';
import { SuccssComponent } from './succss/succss.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    CoursesComponent,
    HomeComponent,
    DetailComponent,
    SpinnerComponent,
    RegisterComponent,
    PersonalInformationComponent,
    CourseregistrationComponent,
    SummaryComponent,
    QuoteComponent,
    EnabledDatesDirective,
    SuccssComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,ReactiveFormsModule,NgxIntlTelInputModule,
    AppRoutingModule, ReactiveFormsModule, // Add ReactiveFormsModule to the imports array
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  //return new TranslateHttpLoader(http, 'https://optimistic-shtern.212-132-106-154.plesk.page/courses/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// return new TranslateHttpLoader(http, 'https://optimistic-shtern.212-132-106-154.plesk.page/courses/assets/i18n/', '.json');
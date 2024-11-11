import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './courses/detail/detail.component';
import { HomeComponent } from './courses/home/home.component';
import { RegisterComponent } from './registration/register/register.component';
import { PersonalInformationComponent } from './registration/personal-information/personal-information.component';
import { SuccssComponent } from './succss/succss.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
   {path: '', component: HomeComponent },

  // { path: 'f/:type/:activities:/Accommodation', component: HomeComponent },
  { path: 'course/:category', component: HomeComponent },
  { path: 'course/:category/:type', component: HomeComponent },
  // { path: ':category/:type/:activity', component: HomeComponent },

  {path: 'register/:id', component: RegisterComponent },
  {path: 'detail/:id', component: DetailComponent },
  {path: 'success', component: SuccssComponent },
  {path: '404', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent }  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

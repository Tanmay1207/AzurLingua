import { Component } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-succss',
  templateUrl: './succss.component.html',
  styleUrls: ['./succss.component.css']
})
export class SuccssComponent {
  constructor(private cookieService: CookieService , private route: ActivatedRoute , private router: Router) { }
  tid: string | null = null;
  ngOnInit(): void { 

    this.route.queryParams.subscribe(params => {
  
      this.tid = params['tid'];
      console.log('TID:', this.tid);

      const tid = this.cookieService.getCookie('tid');

      if(tid === this.tid) {
     
      }      
      else{
        this.router.navigate(['/404']);
      }
      console.log('My Cookie:', tid);

    });


  }
}

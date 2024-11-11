import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { KeyValue } from 'src/app/model/keyValue';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  // courseDetails: KeyValue[]=[];
  // constructor() {
  //   // Initialize key-value pairs here
  //   // this.courseDetails = [
  //   //   new KeyValue('course', 'Angular Basics'),
  //   //   new KeyValue('level', 'Beginner'),
  //   //   new KeyValue('startDate', new Date('2024-03-01')),
  //   //   new KeyValue('endDate', new Date('2024-04-01')),
  //   //   new KeyValue('duration', '4 weeks'),
  //   //   new KeyValue('hosting', 'Online'),
  //   //   new KeyValue('arrivalDate', new Date('2024-02-28'))
  //   // ];
  // }

  receivedData: any;
  private subscription!: Subscription;

  constructor(private sharedService: RegisterService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.message$.subscribe(data => {
      this.receivedData = data;
      // Do something with the received data

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTranslatedText(key: any): string {
    return this.translate.instant(key);
  }
}

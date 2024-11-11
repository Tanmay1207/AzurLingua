// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[appAppEnabledDates]'
// })
// export class AppEnabledDatesDirective {

//   constructor() { }

//}

import { Directive, Input } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Directive({
  selector: '[appEnabledDates]'
})
export class EnabledDatesDirective {
  @Input() appEnableDates!: Date[];

  constructor(private config: BsDatepickerConfig) {}

  ngOnInit() {
    this.config.datesDisabled = this.getDisabledDates();
  }

  private getDisabledDates(): Date[] {
    const currentDate = new Date();
    return this.getAllDates().filter(date => !this.appEnableDates.some(enabledDate => this.isSameDate(date, enabledDate)));
  }

  private getAllDates(): Date[] {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 365; i++) {
      dates.push(new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000)));
    }
    return dates;
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}

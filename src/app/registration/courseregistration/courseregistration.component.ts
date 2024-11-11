import { Component, DebugElement, EventEmitter, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseInformation, LevelOption } from '../../model/coursedetail';
import { DropDownCollection, KeyValue } from '../../model/keyValue';
import { RegisterService } from 'src/app/services/register.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { LoaderService } from 'src/app/services/loader.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ReservationDetails } from 'src/app/model/reservationDetails';


@Component({
  selector: 'app-courseregistration',
  templateUrl: './courseregistration.component.html',
  styleUrls: ['./courseregistration.component.css']
})
export class CourseregistrationComponent {
  openAccordionId: string | null = null;
  enabledDates: Date[] = [];
  courseDetailsForm!: FormGroup;
  itemId!: string;
  courseDetails!: CourseInformation;
  ddlevelOptions: LevelOption[] = [];
  ddduration: DropDownCollection[] = [];
  ddHosting: KeyValue[] = [];
  extra_night_options: any;
  currentDate!: string;
  DATE_FORMAT: string = environment.dateFormat;
  travelOptionFee:number = 0;

  formValue:any;
  constructor(private formBuilder: FormBuilder, private apiService: CoursesService, private route: ActivatedRoute, private sharedService: RegisterService,private translate: TranslateService) { }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  

  ngOnInit(): void {



    this.currentDate = new Date().toISOString().split('T')[0];
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log('Item ID:', this.itemId);
      this.initiateForm();
      this.fetchData(this.itemId);

    });

    this.courseDetailsForm.valueChanges.subscribe(changes => {
      console.log('Form value changed:', changes);
      this.populateSummary();    
      this.formValue = this.courseDetailsForm.value;
       
     
      // const courseStartValue = this.courseDetailsForm.get('courseStart')?.value;
    });

  }

  onRadioChange(fee: any) {
 
    console.log(fee); // This will log the value of the selected radio button
    // Perform any other actions based on the selected radio button
    this.travelOptionFee = fee;
    this.populateSummary();
  }

  fetchData(id: string): void {

    this.apiService.getCouseDetail(id).subscribe(
      (response) => {
        console.log(response);
      
        this.courseDetails = response;
        this.populateDropDownValues();
        this.patchForm();
        this.populateSummary();
   

        const startDates = response.course_details.start_dates.map((date: string) => {
     
          //return DateTime.fromFormat(date, 'MM-dd-yyyy').toJSDate();
          const [year, month, day ] = date.split('-').map(Number);
          return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor
        });
        //
        this.enabledDates = startDates;
        this.GetDisabledDates(this.enabledDates);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
 

  initiateForm() {
    this.courseDetailsForm = this.formBuilder.group({
      courseType: [{ value: '', disabled: true }],
      level: [, Validators.required],
      courseStart: ['', Validators.required],
      duration_weeks: ['', Validators.required],
      individualLesson: ['', Validators.required],
      hosting: [-1, Validators.required], // Set as -1 or null initially
      courseId:[this.itemId],
      arrivalOption: 'sunday',
      departureOption: 'saturday',
      travelOption:''
      
    });
  }

  patchForm() {
 
 
    this.courseDetailsForm.patchValue({
      //courseType: this.courseDetails.courseType,
      courseType: this.courseDetails.course_details.name,
      level: this.courseDetails.level.options[0].value,
      duration_weeks: this.courseDetails.course.duration,
      hosting: "-1",
      courseStart: this.enabledDates[0] ,
    
    });

    // this.enabledDates = this.courseDetails.course_details.start_dates;
  }
  get f() { return this.courseDetailsForm.controls; }




  populateSummary() {
 
    const selectedLevel =  this.ddlevelOptions.find(x=>x.value ==this.courseDetailsForm.get('level')?.value )
    let level="";
    let levelValue="";
    if(selectedLevel) {
        level = selectedLevel.level;
        levelValue = selectedLevel.value;
    }
  

    const courseType = this.courseDetailsForm.get('courseType')?.value;
   
    const courseStart = this.courseDetailsForm.get('courseStart')?.value;
    const duration = this.courseDetailsForm.get('duration_weeks')?.value;
    const durationWeeks = this.getCourseDurationText(duration);
    const hosting: string = this.courseDetailsForm.get('hosting')?.value;
    const hostingDisplayText: string = this.getHostingText(hosting);
    const existingDate = moment(courseStart); // Example existing date: March 5, 2024    
    const endDate = existingDate.add(duration, 'weeks');
 

    let summary = [
      new KeyValue('Course', courseType, 's'),
      new KeyValue('Level', level, 's'),
      new KeyValue('Duration', durationWeeks, 's'),
      new KeyValue('Start Date', moment(this.courseDetailsForm.get('courseStart')?.value).format(this.DATE_FORMAT), 'd'),
      new KeyValue('End Date', moment(endDate).format(this.DATE_FORMAT), 'd'),
      new KeyValue('Hosting', hostingDisplayText, 's'),
    ];

    if (courseStart != '' && hosting.length > 0) {
      const arrivalDate = this.getArrivalDate(courseStart, hosting);
      const departureDate = this.getDepartureDate(endDate, hosting);
      summary.push(new KeyValue('Arrival Date', arrivalDate, 's')),
        summary.push(new KeyValue('Departure', departureDate, 's'));
    }

    debugger;
    let hFee = this.getTotalHostingFee();
    let adminiFee = this.courseDetails.course.administrativeFee;
    let cfees = this.courseDetails.course.courseFee;
    let travelOption  = this.travelOptionFee;

    let hostingFee = this.formatCurrency(hFee, this.courseDetails.course.currency);
    let courseFee = this.formatCurrency(cfees, this.courseDetails.course.currency);
    let administrativeFee = this.formatCurrency(adminiFee, this.courseDetails.course.currency);
    
    let totalFee = hFee + adminiFee + cfees + travelOption;
 

    let Total = this.formatCurrency(totalFee, this.courseDetails.course.currency);

    summary.push(new KeyValue('Hosting Fee', hostingFee, 's')),
    summary.push(new KeyValue('Course', courseFee, 's')),
    summary.push(new KeyValue('Administrative Fee', administrativeFee, 's'));
    summary.push(new KeyValue('Total Fee', Total, 's'));

    let sdate = moment(this.courseDetailsForm.get('courseStart')?.value).format(this.DATE_FORMAT);
    let edate = moment(this.courseDetailsForm.get('courseEnd')?.value).format(this.DATE_FORMAT);
 
    const reservationDetails = new ReservationDetails(
      this.itemId,
      levelValue,
      duration,
      sdate,
      edate,
      hosting.toString(),
      this.courseDetailsForm.get('arrivalOption')?.value,
      this.courseDetailsForm.get('departureOption')?.value,
      this.courseDetailsForm.get('travelOption')?.value,     
      this.courseDetails.course.currency,
      cfees * 100,
      hFee* 100,
      adminiFee* 100,
      totalFee* 100,
      "pending-payment-options",
      -1,
      -1,      
      "pending",
      "pending-comments-section"
  );
  this.sharedService.sendSummary(summary);
  
  this.formSubmit.emit({formValue:this.courseDetailsForm.value, reservationDetails:reservationDetails});
    //summary.push(KeyValue)

    

  }

  onHostingDropdownChange(event: any) {
    const selectedValue = event.target.value;
    let result = this.courseDetails.course_details.hostings.find(hosting => hosting.value === selectedValue);
    this.extra_night_options = result?.extra_night_options;

  }


  populateDropDownValues() {

    this.ddlevelOptions = this.courseDetails.level.options;
    for (let i = this.courseDetails.course.minduration; i <= this.courseDetails.course.maxduration; i++) {     
      this.ddduration.push(new DropDownCollection(i + '-' + this.courseDetails.course.timeFrame, i));
    }
  }


  getHostingText(val: any): string {
    let hostingText: string = ""; // Initialize hostingText to an empty string

    if (val !== null) {
      let result = this.courseDetails.course_details.hostings.find(x => x.value === val);
      if (result !== undefined) { // Check if result is not undefined
        hostingText = result.description ?? ""; // Use the nullish coalescing operator (??) to handle undefined description
      }
    }

    return hostingText;
  }

  getArrivalDate(courseStart: Date, isHosting: string) {
 
    if (isHosting.length > 0) {
      const arrivalOption = this.courseDetailsForm.get('arrivalOption')?.value;
      if (courseStart && arrivalOption && arrivalOption == 'saturday') {
        const existingDate = moment(courseStart); // Example existing date: March 5, 2024    
        const getArrivalDate = existingDate.add(-1, 'days').format(this.DATE_FORMAT);
        return getArrivalDate;
      }
      if (arrivalOption && arrivalOption == 'sunday') {
        const getArrivalDate = moment(courseStart).format(this.DATE_FORMAT);
        return getArrivalDate;
      }
    }
    else {
      return '';
    }
    return '';
  }

  getDepartureDate(enddate: moment.Moment, isHosting: string) {
    if (isHosting.length> 0) {
      const departureOption: string = this.courseDetailsForm.get('departureOption')?.value;
      if (departureOption && departureOption == 'sunday') {
        const existingDate = moment(enddate); // Example existing date: March 5, 2024    
        const departureDate = existingDate.add(1, 'days').format(this.DATE_FORMAT);
        return departureDate;
      }
      if (departureOption && departureOption == 'saturday') {
        return enddate.format(this.DATE_FORMAT);
      }
    }
    else {
      return '';
    }
    return '';
  }

  getCourseDurationText(val: any): string {
    return val + "-Week";
  }



  getTotalHostingFee() {
 
    let saturdayArrival: number = 0;
    let sundayDeparture: number = 0;
    let totalHostingFee =0;
    let hostingValue = this.courseDetailsForm.get('hosting')?.value;

    if (hostingValue && hostingValue.length > 0) {
 
      const hosting = this.courseDetails.course_details.hostings.find(x => x.value == hostingValue);      
      const departureOption: string = this.courseDetailsForm.get('departureOption')?.value;
       console.log(hosting?.hostingFee);
      if (hosting && departureOption && departureOption == 'sunday') {
        if (hosting.extra_night_options?.departure?.sunday) {
          sundayDeparture = hosting.extra_night_options?.departure?.sunday;
        }
      }

      const arrivalOption = this.courseDetailsForm.get('arrivalOption')?.value;
      if (hosting && arrivalOption && arrivalOption == 'saturday') {
        if (hosting.extra_night_options?.arrival?.saturday) {
          saturdayArrival = hosting.extra_night_options?.arrival?.saturday;
        }
      }
      if(hosting)
      {
        totalHostingFee = hosting?.hostingFee + sundayDeparture + saturdayArrival;
      }
      else{
        totalHostingFee =  sundayDeparture + saturdayArrival;
      }
     
    }

  
    return totalHostingFee;
  }


  formatCurrency(value: any, currency: string = ''): string {
    // Assuming value is in USD, formatting it to Euro

    if (typeof value === 'number' && !isNaN(value)) {
      if (currency.length == 0) {
        currency = this.courseDetails.course?.currency;
      }
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(value);
    }
    else {
      return '';
    }
  }


  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates: any = [];

  GetDisabledDates(excludeDates: Array<Date>) {
 
    var now = new Date();
    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need
    console.log(startDate);
    console.log(endDate);
    this.disabledDates = [];
    do {
      var found = false;
      for (var i = 0; i < excludeDates.length; i++) {
        var excludeDate: Date = excludeDates[i];
        if (this.IsSameDay(excludeDate, startDate)) {
          found = true;
        }
      }
      if (!found) {
        this.disabledDates.push(startDate);
      }
      startDate = new Date((startDate.getTime() + this.millisecondPerDay));
    } while (startDate <= endDate)

    //console.log("Calculated: "+this.disabledDates);
  }

  IsSameDay(date1: Date, date2: Date) {
    const today = moment();
    const anotherDate = moment(date2);

    if (anotherDate.isAfter(today)) {
      if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }

  }

  onOpenCalendar(container: any) {    
    container.dates
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('day');
  }

  getStartingDateOfCourse(excludeDates: Array<Date>)  : Date | undefined
  {
    debugger;
    const today = moment();
    
    for (var i = 0; i < excludeDates.length; i++) {
      var excludeDate: Date = excludeDates[i];
      const anotherDate = moment(excludeDate);
      if (anotherDate.isAfter(today)) {
        return excludeDate;
        break;
      }
     
    }
    return undefined;
  }

  getTranslatedText(key: any): string {
    return this.translate.instant(key);
  }

}




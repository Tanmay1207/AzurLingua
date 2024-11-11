import { Component } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseInformation } from '../../model/coursedetail';
import { KeyValue } from '../../model/keyValue';
import { CourseRegistration } from 'src/app/model/paymentrequest';
import { PaymentService } from 'src/app/services/payment.service';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { CookieService } from 'src/app/services/cookie.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  courceReg!: any;
  personalInfo: any;
  randomUUID:string="";
  DATE_FORMAT: string = environment.dateFormat;
  apiUrl = environment.apiUrl;
  lang  = environment.lang;
  constructor(private router: Router, private http: HttpClient,private paymentService: PaymentService,private cookieService: CookieService) { 
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


  onCourceRegitrationChange(formData: any) {
 
    console.log('Form data from couse data child:')
    console.log(formData);
    this.courceReg = formData;
    // Do whatever you need with the form data in the parent component
  }

  onCourcePersonalInfoChange(formData:any) 
  {
    console.log('Form data from personal info change')
    this.personalInfo= formData;
    console.log('Form data Personal Info child:', formData);    
    debugger;
    this.randomUUID = uuidv4();
    let paymentInfo = this.mapToPersonalInfo(this.personalInfo);
    let courseInfo = this.mapToCourseInfo(this.courceReg.formValue);
    let customerDetails = this.mapToCustomerDetails(this.personalInfo);
    this.courceReg.reservationDetails.comments = this.personalInfo.comment;
    const paymentRequest: CourseRegistration = {     
       paymmentInfo: paymentInfo,
       courseInfo :courseInfo,
       reservationDetails:this.courceReg.reservationDetails,
       customerDetails:customerDetails
    };

    const tidValue = this.randomUUID; // Replace with your desired tid value
    const expirationMinutes = 20; // 20 minutes
    this.cookieService.setCookie('tid', tidValue, expirationMinutes);

    this.paymentService.processPayment(paymentRequest)
      .subscribe(
        response => {
          console.log('Payment processed successfully:', response);
          debugger;
          console.log(response.hosted_payment.payment_url);            
          //this.router.navigateByUrl(response.hosted_payment.payment_url);
          if(response.hosted_payment.payment_url)
          {
            window.location.href =response.hosted_payment.payment_url;
          }
          else {
            window.location.href =response.hosted_payment.return_url;
          }
          
        
          // Handle success
        },
        error => {
          console.error('Failed to process payment:', error);
          // Handle error
        }
      );
  }

  mapToCourseInfo(response: any): any {
    return {
      level: response.level,
      courseStart: response.courseStart,
      duration_weeks: response.duration_weeks,
      individualLesson: response.individualLesson,
      hosting: response.hosting,
      arrivalOption: response.arrivalOption,
      departureOption: response.departureOption,
      courseId: response.courseId,
      travelOption: response.travelOption
    };
  }

  mapToPersonalInfo(response:any):any{
     
   
    const paymentinfo = {
      gender: this.personalInfo.gender,
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      birthDate: this.personalInfo.birthDate,
      phoneNumber: this.personalInfo.phone.e164Number,
      email: this.personalInfo.email,
      address: this.personalInfo.address,
      postalCode: this.personalInfo.postalCode,
      city: this.personalInfo.city,
      country: this.personalInfo.country,
      authorization: this.personalInfo.authorization,
      emergencyPhoneNumber: this.personalInfo.emergencyPhoneNumber,
      comment: this.personalInfo.comment,
      selectedPaymentOption: this.personalInfo.selectedPaymentOption,
      fixPaymentOption:this.personalInfo.fixPaymentOption,   
      acceptGeneralConditionsCreditCard:this.personalInfo.acceptGeneralConditionsCreditCard,
      return_url: this.getDomainName(),
      cancel_url: this.getDomainName(),
      amount :250,
      currency:'EUR',
      tid:this.randomUUID,
      oid:uuidv4()
     
    };
    return paymentinfo;
  }

  mapToCustomerDetails(response:any):any
  {
    const customerDetails = {
      title: this.getTitle(this.personalInfo.gender),
      first_name: this.personalInfo.firstName,
      last_name: this.personalInfo.lastName,
      address1: this.personalInfo.address,
      address2: null,
      company_name: null,
      postcode:this.personalInfo.postalCode,
      city:this.personalInfo.city,
      state: null,
      country:  this.personalInfo.country,
      email: this.personalInfo.email,
      mobile_phone_number:  this.personalInfo.emergencyPhoneNumber,
      landline_phone_number: null,
      language: this.lang,
      birthdate: moment(this.personalInfo.birthDate).format(this.DATE_FORMAT)
  }
  return customerDetails;
}

  getTitle(personalInfo: string): string {
  return personalInfo.toLowerCase() === "male" ? "mr" : "ms";
}

  getDomainName(): string {
     
    let url = "";
    const fullUrl = window.location.href;
    const hashIndex = fullUrl.indexOf('#');

    // If '#' exists, remove everything after it
    if (hashIndex !== -1) {
      const cleanUrl = fullUrl.substring(0, hashIndex);
      console.log('Clean URL:', cleanUrl);
      url = cleanUrl;
      // You can further use this cleanUrl as needed
    } else {
      console.log('No hash found in URL, full URL:', fullUrl);
      // Handle the case when there is no '#' in the URL
    }
    return url;
  }
}
 


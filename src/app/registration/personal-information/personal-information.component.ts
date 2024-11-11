 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/model/country';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent {

  personalInfoForm!: FormGroup;
  countries :Country[]=[];
  cardSelected:string='';
  constructor(private fb: FormBuilder ,private paymentService:PaymentService) { }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  DATE_FORMAT: string = environment.dateFormat;

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
 
  
  ngOnInit(): void {


    this.personalInfoForm = this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required]], // Validating mobile number
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]], // Validating postal code
      postalCode: ['', [Validators.required]], // Validating postal code
      city: ['', Validators.required],
      country: ['', Validators.required],
      authorization: ['', Validators.required],
      emergencyPhoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]], // Validating emergency phone number
      comment: [''],
      selectedPaymentOption: ['1'],
      fixPaymentOption: ['2'],
      // termAndCondition: ['cc', [Validators.required]],
      acceptGeneralConditionsCreditCard: [false, [Validators.required]],
    });

    let data =  this.populateCountryDropDown();

  }
  populateCountryDropDown()
  {
    
    this.paymentService.getAllCountries().subscribe(
      (response:Country[]) => {
        console.log(response);      
        this.countries = response;           
      }
    );

  }

  onRadioButtonChange(value: string) {
    this.cardSelected = value;    
    this.personalInfoForm.get('acceptGeneralConditionsCreditCard')?.patchValue(false);
  }

  onSubmit() {
    // Handle form submission here
    this.formSubmit.emit(this.personalInfoForm.value);
  }

  isSubmitButtonEnabled(): boolean {
    // Check if submit button should be enabledd
    let value = this.personalInfoForm.get('acceptGeneralConditionsCreditCard')?.value;;
     
    return this.personalInfoForm.valid && this.personalInfoForm.get('acceptGeneralConditionsCreditCard')?.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {

  myForm!: FormGroup;
  genders = ['Male', 'Female', 'Other'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required]
 
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
      // You can implement further actions like sending the form data to a server
    } else {
      console.error('Form is invalid');
    }
  }

}

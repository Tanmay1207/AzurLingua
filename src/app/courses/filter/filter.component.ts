import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  form!: FormGroup;

  categories = ['Adults', 'Juniors', 'Kids','Teacher']; // Sample categories
  types = ['Language Courses', 'Face-to-Face French Lessons', 'Online French Course']; // Sample types
  accommodations = ['Yes', 'No']; // Sample accommodations
  activities = ['Yes', 'No']; // Sample activities
  funding = ['Online Payment', 'Personal Training Account', 'Public Funding']; // Sample funding


  category: string ="";
  type: string="";
  act: string="";
  userFilter:string = ""; //

  constructor(private fb: FormBuilder , private sharedService: SharedService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      category: ['Adults'],
      type: ['Language Courses'],
      accommodation: ['Yes'],
      activity: ['Yes'],
      funding: ['Online Payment']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      this.category = params.get('category')!;
      this.type = params.get('type')!;
      this.act = params.get('activity')!;   
      this.act = params.get('filter')!;  
      this.userFilter = params.get('filter')!;  

      console.log(params.getAll.length);


      const paramKeys = Array.from(params.keys);
      const paramLength = paramKeys.length;
 
    //   if(paramLength ==3){
    //   this.form.patchValue({
    //     category: this.category,
    //     type: this.type ,
    //     activity : this.act
    //   });   
    //   setTimeout(() => {
    //     // Code to execute after the delay
    //     this.afterFormPatch();
    //   }, 100);
    // }
 
    if(paramLength ==1){
      
      this.form.patchValue({
        category: this.category, 
      });   
      setTimeout(() => {
        // Code to execute after the delay
        this.afterFormPatch();
      }, 100);
    }
    if(paramLength ==2){
      this.form.patchValue({
        category: this.category,
        type: this.type  
      });   
      setTimeout(() => {
        // Code to execute after the delay
        this.afterFormPatch();
      }, 100);
    }

      
    });
   
  
  }
  afterFormPatch() {
    // Place your code here that you want to execute after form patch
   this.sharedService.sendMessage(this.form.value);
  }
 
 
  onSubmit() {
    console.log();

    this.sharedService.sendMessage(this.form.value);
    // You can perform further actions with the form values here
  }
}

//http://localhost:4200/#/sports/outdoor/running
//http://localhost:4200/#/Adults/Face-to-Face French Lessons/yes
 
//http://localhost:4200/#/Adults/Face-to-Face French Lessons

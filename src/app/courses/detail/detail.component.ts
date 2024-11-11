import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CourseInformation } from '../../model/coursedetail';
 
 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  itemId!: string;
  courseDetail!:CourseInformation;


  constructor(private router: Router,private route: ActivatedRoute, private apiService: CoursesService) { }

  ngOnInit(): void {
    // Extracting ID parameter from route
    this.route.params.subscribe(params => {
      debugger;
      this.itemId = params['id'];
      console.log('Item ID:', this.itemId);
      this.fetchData(this.itemId);
      // You can use this.itemId to fetch item details or perform any other logic
    });
  }

  fetchData(id:string)
  {

     this.apiService.getCouseDetail(id).subscribe(
      (response) => {
      debugger;
        console.log(response);
        // if(response==null)
        //   {
        //     this.router.navigate(['/404']);
        //   }
        this.courseDetail = response;
 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

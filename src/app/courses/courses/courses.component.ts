import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { SharedService } from '../../services/shared.service';
import { IFilter } from '../../model/filter';
import { ICourse } from '../../model/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  pagedCourses: ICourse[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  filter: any = {}; // Use any type for filter object

  constructor(private apiService: CoursesService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.loadCourses();

    this.sharedService.message$.subscribe(message => {
      this.filter = message;
      this.applyFilterAndPagination();
    });
  }

  loadCourses() {
    this.apiService.get().subscribe(courses => {
      this.courses = courses;
      this.applyFilterAndPagination();
    });
  }

  applyFilterAndPagination() {
    
    this.filteredCourses = this.courses.filter(course =>
      (this.filter.category ? course.category.toLowerCase().includes(this.filter.category.toLowerCase()) : true) &&
      (this.filter.type ? course.type.toLowerCase().includes(this.filter.type.toLowerCase()) : true) &&
      (this.filter.accommodation ? course.accomodation.toLowerCase().includes(this.filter.accommodation.toLowerCase()) : true) &&
      (this.filter.activity ? course.activity.toLowerCase().includes(this.filter.activity.toLowerCase()) : true) &&
      (this.filter.funding ? course.funding.toLowerCase().includes(this.filter.funding.toLowerCase()) : true)
    );

    this.totalItems = this.filteredCourses.length;
    this.setPage(1);
    console.log(this.filteredCourses);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      page = Math.min(Math.max(page, 1), this.totalPages); // Clamp page number within valid range
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.totalItems - 1);
    this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  handleDivClick(id: any) {
    this.router.navigate(['/detail', id]);
    console.log('handleDivClick');
  }

  // Function to determine if there's only one column and apply the appropriate class
  isOneColumnLayout(): boolean {
    return this.pagedCourses.length === 1;
  }
}

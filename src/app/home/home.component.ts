import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CourseService } from '../shared/services/course.service';
import { CourseCardListComponent } from '../course/components/course-card-list/course-card-list.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    AsyncPipe,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    CourseCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCourses();
  }
}

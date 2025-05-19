import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../models/course.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-course-card-list',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export class CourseCardListComponent {
  @Input() courses: Course[] = [];
}

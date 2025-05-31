import { Component, Input, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../models/course.model';
import { RouterModule } from '@angular/router';
import { CourseDialogService } from '../../services/course-dialog.service';
import { filter, Subject, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-course-card-list',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export class CourseCardListComponent implements OnDestroy {
  constructor(private courseDialogService: CourseDialogService) { }

  destroy$ = new Subject<void>();

  @Input() courses: Course[] = [];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickEdit(course: Course): void {
    this.courseDialogService.openEditCourseDialog(course)
      .pipe(takeUntil(this.destroy$))
      .pipe(filter(val => !!val)) // To filter our values that are not 'truthy'. Will occur if the user closes the dialog without clicking save.
      .pipe(tap(((courseData: Course) => {
        course.title = courseData.title;
        course.releasedAt = courseData.releasedAt;
        course.difficulty = courseData.difficulty;
        course.description = courseData.description;
      })))
      .subscribe();
  }
}

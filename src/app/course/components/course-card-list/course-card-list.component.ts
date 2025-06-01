import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';
import { Course } from '../../models/course.model';
import { RouterModule } from '@angular/router';
import { CourseDialogService } from '../../services/course-dialog.service';
import { filter, Subject, take, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-course-card-list',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatGridListModule, LayoutModule],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export class CourseCardListComponent implements OnInit, OnDestroy {
  @Input() courses: Course[] = [];

  gridCols: number = 3;
  gridRowHeight: string = '500px';

  destroy$ = new Subject<void>();

  constructor(private courseDialogService: CourseDialogService, private breakpointObserver: BreakpointObserver) { }


  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ])
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(result => this.updateGridLayout(result)))
      .subscribe();
  }

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

  private updateGridLayout(result: BreakpointState): void {
    const breakpoints = result.breakpoints;

    if (breakpoints[Breakpoints.TabletPortrait]) {
      this.gridCols = 1;
    } else if (breakpoints[Breakpoints.TabletLandscape]) {
      this.gridCols = 3;
    } else if (breakpoints[Breakpoints.HandsetPortrait]) {
      this.gridCols = 1;
    } else if (breakpoints[Breakpoints.HandsetLandscape]) {
      this.gridCols = 2;
    } else {
      this.gridCols = 3;
    }
  }
}


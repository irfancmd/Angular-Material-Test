import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { every, finalize, merge, Observable, Subject, take, takeUntil, takeWhile, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'
import { MatCheckboxModule } from '@angular/material/checkbox';


import { Course } from '../../models/course.model';
import { CourseService } from '../../../shared/services/course.service';
import { LessonService } from '../../../shared/services/lesson.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-course-details',
  imports: [AsyncPipe, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatCheckboxModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  course: Course | undefined;
  lessons: Lesson[] = [];
  loading = false;

  displayColumns = ['select', 'id', 'title', 'description'];
  expandedLesson: Lesson | null = null;
  selection = new SelectionModel<Lesson>(true, []);

  destroy$ = new Subject<void>();

  @Input()
  set courseId(courseId: string) {
    this.courseService.getCourseById(+courseId).pipe(takeUntil(this.destroy$)).subscribe((course) => {
      this.course = course;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.loadLessons();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(() => this.loadLessons()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleLesson(lesson: Lesson): void {
    this.expandedLesson = lesson === this.expandedLesson ? null : lesson;
  }

  onLessonCheckboxToggled(lesson: Lesson): void {
    this.selection.toggle(lesson);

    console.log('Selected lessons:', this.selection.selected);
  }

  toggleAll(): void {
    this.isAllSelected ? this.selection.clear() : this.selection.select(...this.lessons);
  }

  get isAllSelected(): boolean {
    return this.selection.selected.length === this.lessons.length;
  }

  private loadLessons(): void {
    if (this.course) {
      this.loading = true;

      this.lessonService.getPaginatedLessonsByCourseId(
        this.course.id,
        (this.paginator?.pageIndex ?? 0) + 1,
        this.paginator?.pageSize ?? 5,
        this.sort?.direction ?? 'asc',
        this.sort?.active ?? 'id'
      )
        .pipe(takeUntil(this.destroy$))
        .pipe(finalize(() => this.loading = false))
        .subscribe(lessons => {
          this.lessons = lessons;
        });
    }
  }
}

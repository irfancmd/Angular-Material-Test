import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LessonService } from '../../../shared/services/lesson.service';
import { Lesson } from '../../models/lesson.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-example-lesson-drag-drop',
  imports: [DragDropModule],
  templateUrl: './example-lesson-drag-drop.component.html',
  styleUrl: './example-lesson-drag-drop.component.scss'
})
export class ExampleLessonDragDropComponent implements OnInit, OnDestroy {
  lessons: Lesson[] = [];
  lessonsCompleted: Lesson[] = [];

  destroy$ = new Subject<void>();

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.lessonService.getAllLessons()
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(lessons => this.lessons = lessons))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // onLessonItemDropped(event: CdkDragDrop<Lesson[]>): void {
  //   moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
  // }

  onLessonItemDroppedMultiList(event: CdkDragDrop<Lesson[]>): void {
    if (event.previousContainer === event.container) {
      // Drag drop within the same list
      moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}

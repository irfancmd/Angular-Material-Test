import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { Lesson } from '../../course/models/lesson.model';

const LESSON_DATA: Lesson[] = [
  { id: 1, courseId: 1, title: 'Introduction to Angular', description: 'Learn the basics of Angular framework.' },
  { id: 2, courseId: 1, title: 'Environment Setup', description: 'Install necessary compoennts.' },
  { id: 3, courseId: 1, title: 'Creating Our First Project', description: 'Creating our first angular project.' },
  { id: 4, courseId: 2, title: 'Introduction', description: 'Introduction to the Advanced Angular course.' },
  { id: 5, courseId: 2, title: 'Environment Setup', description: 'Install necessary compoennts.' },
  { id: 6, courseId: 2, title: 'Using Third Party UI Libraries', description: 'Using third party UI libraries for Angular.' },
  { id: 7, courseId: 3, title: 'Introduction', description: 'Introduction to the Advanced For Experts course.' },
  { id: 8, courseId: 3, title: 'Creating a Library', description: 'Creating our own Angular library.' },
];

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor() { }

  getAllLessons(): Observable<Lesson[]> {
    return of(LESSON_DATA);
  }

  getLessonsByCourseId(courseId: number): Observable<Lesson[]> {
    return of(LESSON_DATA).pipe(map(lessons => lessons.filter(lesson => lesson.courseId === courseId)));
  }

  getPaginatedLessonsByCourseId(courseId: number, pageNumber = 1, pageSize = 5, sortOrder = 'asc', activeSortColumn = 'id'): Observable<Lesson[]> {
    return of(LESSON_DATA)
      .pipe(map(lessons => this.sortLessons(lessons, sortOrder, activeSortColumn)))
      .pipe(map(lessons => lessons.filter(lesson => lesson.courseId === courseId).slice((pageNumber - 1) * pageSize, pageNumber * pageSize)))
      .pipe(delay(1000)); // Simulate a delay
  }

  private sortLessons(lessons: Lesson[], sortOrder: string, activeSortColumn: string): Lesson[] {
    return lessons.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a[activeSortColumn] > b[activeSortColumn] ? 1 : -1;
      }

      return a[activeSortColumn] < b[activeSortColumn] ? 1 : -1;
    });
  }
}

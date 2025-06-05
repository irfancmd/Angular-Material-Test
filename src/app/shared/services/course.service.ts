import { Injectable } from '@angular/core';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { Course } from '../../course/models/course.model';

const COURSE_DATA: Course[] = [
  { id: 1, title: 'Angular Basics', difficulty: 'Beginner', imageUrl: 'https://picsum.photos/200/300', lessonCount: 3 },
  { id: 2, title: 'Advanced Angular', difficulty: 'Advanced', imageUrl: 'https://picsum.photos/200/300', lessonCount: 3 },
  { id: 3, title: 'Angular for Experts', difficulty: 'Intermediate', imageUrl: 'https://picsum.photos/200/300', lessonCount: 2 }
]

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses$ = new Observable<Course[]>;
  beginnerCourses$ = new Observable<Course[]>;
  advancedCourses$ = new Observable<Course[]>;

  loadCourses(): void {
    this.courses$ = new Observable<Course[]>(observer => {
      observer.next(COURSE_DATA);
      observer.complete();
    });

    this.beginnerCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.difficulty === 'Beginner')));

    this.advancedCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course => course.difficulty !== 'Beginner')));
  }

  getAllCourses(): Observable<Course[]> {
    return of(COURSE_DATA);
  }

  getCourseById(courseId: number): Observable<Course | undefined> {
    return of(COURSE_DATA).pipe(
      switchMap(courses => of(courses.find(course => course.id === courseId))));
  }
}

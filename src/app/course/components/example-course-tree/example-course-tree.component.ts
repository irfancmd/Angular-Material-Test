import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, takeUntil, tap } from 'rxjs';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CourseTreeNode } from './interfaces/course-tree-node.interface';
import { CourseService } from '../../../shared/services/course.service';
import { LessonService } from '../../../shared/services/lesson.service';

@Component({
  selector: 'app-example-course-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './example-course-tree.component.html',
  styleUrl: './example-course-tree.component.scss'
})
export class ExampleCourseTreeComponent implements OnInit, OnDestroy {
  // For Nested Tree
  nestedTreeNodes: CourseTreeNode[] = [];

  nestedTreeDataSource = new MatTreeNestedDataSource<CourseTreeNode>();

  private destroy$ = new Subject<void>();

  constructor(private courseService: CourseService, private lessonService: LessonService) { }

  ngOnInit(): void {
    forkJoin([this.courseService.getAllCourses(), this.lessonService.getAllLessons()])
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(([courses, lessons]) => {
        courses.forEach(course => {
          this.nestedTreeNodes.push({
            name: course.title,
            children: lessons.filter(lesson => lesson.courseId === course.id).map(lesson => ({
              name: lesson.title,
            }))
          });
        });

        this.nestedTreeDataSource.data = this.nestedTreeNodes;
      }))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nestedTreeChildrenAccessor = (node: CourseTreeNode) => node.children ?? [];

  hasNestedChild(index: number, node: CourseTreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }
}

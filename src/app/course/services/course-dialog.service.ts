import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../components/course-dialog/course-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDialogService {

  constructor(private dialog: MatDialog) { }

  openEditCourseDialog(course: Course): Observable<any> {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.data = { ...course };

    const dialogRef = this.dialog.open(CourseDialogComponent, config);

    return dialogRef.afterClosed();
  }
}

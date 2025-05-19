import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CreateCourseStep1Component } from './components/create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './components/create-course-step-2/create-course-step-2.component';

@Component({
  selector: 'app-create-course',
  imports: [MatStepperModule, MatButtonModule, CreateCourseStep1Component, CreateCourseStep2Component],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {

}

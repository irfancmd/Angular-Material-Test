import { Component } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-example-course-virtual-scroll',
  imports: [ScrollingModule],
  templateUrl: './example-course-virtual-scroll.component.html',
  styleUrl: './example-course-virtual-scroll.component.scss'
})
export class ExampleCourseVirtualScrollComponent {
  // Dummy course array
  courses = Array.from({ length: 5000 }, (value, i) => `Course ${i + 1}`);
}

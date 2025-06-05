import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateCourseComponent } from './course/components/create-course/create-course.component';
import { CourseDetailsComponent } from './course/components/course-details/course-details.component';
import { ExampleLessonDragDropComponent } from './course/components/example-lesson-drag-drop/example-lesson-drag-drop.component';
import { ExampleCourseTreeComponent } from './course/components/example-course-tree/example-course-tree.component';
import { ExampleCourseVirtualScrollComponent } from './course/components/example-course-virtual-scroll/example-course-virtual-scroll.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'add-new-course',
        component: CreateCourseComponent
    },
    {
        path: 'course/:courseId',
        component: CourseDetailsComponent
    },
    {
        path: 'example/lesson-drag-drop',
        component: ExampleLessonDragDropComponent
    },
    {
        path: 'example/course-tree',
        component: ExampleCourseTreeComponent
    },
    {
        path: 'example/course-virtual-scroll',
        component: ExampleCourseVirtualScrollComponent
    },
];

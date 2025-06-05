import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCourseTreeComponent } from './example-course-tree.component';

describe('ExampleCourseTreeComponent', () => {
  let component: ExampleCourseTreeComponent;
  let fixture: ComponentFixture<ExampleCourseTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCourseTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleCourseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

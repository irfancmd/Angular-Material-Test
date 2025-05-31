import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleLessonDragDropComponent } from './example-lesson-drag-drop.component';

describe('ExampleLessonDragDropComponent', () => {
  let component: ExampleLessonDragDropComponent;
  let fixture: ComponentFixture<ExampleLessonDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleLessonDragDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleLessonDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

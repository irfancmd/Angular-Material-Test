import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCourseVirtualScrollComponent } from './example-course-virtual-scroll.component';

describe('ExampleCourseVirtualScrollComponent', () => {
  let component: ExampleCourseVirtualScrollComponent;
  let fixture: ComponentFixture<ExampleCourseVirtualScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCourseVirtualScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleCourseVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

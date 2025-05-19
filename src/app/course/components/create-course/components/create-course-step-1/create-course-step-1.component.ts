import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCalendarCellClassFunction, MatCalendarView, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-create-course-step-1',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-course-step-1.component.html',
  styleUrl: './create-course-step-1.component.scss'
})
export class CreateCourseStep1Component {
  form!: FormGroup;

  highlightDateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: MatCalendarView) => {
    const date = cellDate.getDate();

    if (view === 'month') {
      return date === 1 ? 'highlight-date' : '';
    }

    return '';
  };

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      releasedAt: [new Date(), Validators.required],
      category: ['Beginner', Validators.required],
      courseType: ['premium', Validators.required],
      description: ['', Validators.maxLength(1024)],
      downloadAllowed: [false, Validators.requiredTrue],
    });
  }

  get courseTitle(): FormControl {
    return <FormControl>this.form.get('title');
  }
}

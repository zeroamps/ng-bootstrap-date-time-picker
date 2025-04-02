import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { CustomDateTimePickerDialogComponent } from './custom-date-time-picker-dialog/custom-date-time-picker-dialog.component';

@NgModule({
  declarations: [CustomDateTimePickerComponent, CustomDateTimePickerDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule, NgbDatepickerModule],
  exports: [CustomDateTimePickerComponent]
})
export class CustomDateTimePickerModule {}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './custom-date-time-picker-dialog.component.html'
})
export class CustomDateTimePickerDialogComponent implements OnInit {
  timeOptions: string[] = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  fromTimeControl: FormControl;
  toTimeControl: FormControl;
  error: string | null = null;
  selectedDateTimeRange: string;

  constructor(
    private _modal: NgbActiveModal,
    private _calendar: NgbCalendar,
    public i18n: NgbDatepickerI18n
  ) {}

  ngOnInit() {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    if (!this.selectedDateTimeRange) {
      this.fromDate = this._calendar.getToday();
      this.toDate = this._calendar.getNext(this._calendar.getToday(), 'd', 2);
      this.fromTimeControl = new FormControl('09:00');
      this.toTimeControl = new FormControl('10:00');
      return;
    }

    const [start, end] = this.selectedDateTimeRange.split(' - ');
    const [startDate, startTime] = start.split(' ');
    const [endDate, endTime] = end.split(' ');

    const [startDay, startMonth, startYear] = startDate.split('/').map(Number);
    const [endDay, endMonth, endYear] = endDate.split('/').map(Number);

    this.fromDate = new NgbDate(startYear, startMonth, startDay);
    this.toDate = new NgbDate(endYear, endMonth, endDay);

    this.fromTimeControl = new FormControl(startTime);
    this.toTimeControl = new FormControl(endTime);
  }

  dismiss() {
    this._modal.dismiss();
  }

  confirm() {
    this.error = null;

    if (!this.fromDate || !this.toDate) {
      this.error = 'Please select a valid date range.';
      return;
    }

    if (this.fromDate.equals(this.toDate)) {
      const fromTime = this.fromTimeControl.value.split(':').map(Number);
      const toTime = this.toTimeControl.value.split(':').map(Number);

      const fromTimeInMinutes = fromTime[0] * 60 + fromTime[1];
      const toTimeInMinutes = toTime[0] * 60 + toTime[1];

      if (toTimeInMinutes - fromTimeInMinutes < 60) {
        this.error = 'The "From" time must be earlier than the "To" time and at least one hour apart.';
        return;
      }
    }

    const startDateTime = `${this.formatDate(this.fromDate)} ${this.fromTimeControl.value}`;
    const endDateTime = `${this.formatDate(this.toDate)} ${this.toTimeControl.value}`;

    this._modal.close(`${startDateTime} - ${endDateTime}`);
  }

  dateSelected(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && (date.after(this.fromDate) || date.equals(this.fromDate))) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  formatDate(date: NgbDate | null) {
    if (!date) return '----';
    const { year, month, day } = date;
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  }
}

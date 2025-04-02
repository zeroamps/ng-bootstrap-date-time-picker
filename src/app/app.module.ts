import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomDateTimePickerModule } from './custom-date-time-picker/custom-date-time-picker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, CustomDateTimePickerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

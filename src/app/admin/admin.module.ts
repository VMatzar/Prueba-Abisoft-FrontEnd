import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { EnrollmentEditComponent } from './components/enrollment-edit/enrollment-edit.component';
import { EnrollmentCreateComponent } from './components/enrollment-create/enrollment-create.component';
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
@NgModule({
  declarations: [NavComponent, EnrollmentListComponent, EnrollmentEditComponent, EnrollmentCreateComponent],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    LayoutModule,
  ],
})
export class AdminModule { }

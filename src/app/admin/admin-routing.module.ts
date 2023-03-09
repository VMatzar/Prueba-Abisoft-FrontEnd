import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { EnrollmentCreateComponent } from './components/enrollment-create/enrollment-create.component';
import { EnrollmentEditComponent } from './components/enrollment-edit/enrollment-edit.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';

const routes: Routes = [
  {
    path:'',
    component:NavComponent,
    children:[
      {
        path: '',
        redirectTo: '/enrollments',
        pathMatch: 'full',
      },
      {
        path:'enrollments',
        component:EnrollmentListComponent
      },
      {
        path:'enrollments/create',
        component:EnrollmentCreateComponent
      },
      {
        path:'enrollments/edit/:id',
        component:EnrollmentEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

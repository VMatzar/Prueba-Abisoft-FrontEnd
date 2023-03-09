import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Enrollment } from 'src/app/core/models/enrollment.model';
import { SerEnrollmentService } from 'src/app/core/services/ser-enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss']
})
export class EnrollmentListComponent {
  enrollments: Enrollment[] = [];

  displayedColumns: string[] = ['inscripcion_id', 'nombre', 'edad', 'fecha_nac', 'fecha_inscripcion', 'costo', 'actions'];
  dataSource: any;
  constructor(
    private serEnrollmentService: SerEnrollmentService,
  ) { }

  ngOnInit(): void {
    this.fetchInscripciones();
  }
  //Comparer Function    
  GetSortOrder(prop: string) {
    return function (a: any, b: any) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetchInscripciones() {
    this.serEnrollmentService.getAllEnrollments()
      .subscribe(enrollmentsObservableUnsorted => {
        this.enrollments = enrollmentsObservableUnsorted.sort(this.GetSortOrder("inscripcion_id"));
        this.dataSource = new MatTableDataSource(this.enrollments);
      });
  }
  deleteInscripcion(id: string): void {
    this.serEnrollmentService.deleteEnrollment(id).subscribe((rtaObservable) => {
      if (rtaObservable) {
        const index = this.enrollments.findIndex((enrollment) => enrollment.inscripcion_id === id);
        this.enrollments.splice(index, 1);
        this.enrollments = [...this.enrollments];
        this.dataSource = new MatTableDataSource(this.enrollments);

        alert('Inscripcion Eliminado exitosamente');
      }
    })

  }
}

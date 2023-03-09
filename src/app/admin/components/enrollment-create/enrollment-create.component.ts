import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SerEnrollmentService } from 'src/app/core/services/ser-enrollment.service';
@Component({
  selector: 'app-enrollment-create',
  templateUrl: './enrollment-create.component.html',
  styleUrls: ['./enrollment-create.component.scss']
})
export class EnrollmentCreateComponent implements OnInit {
  mode: ProgressBarMode = 'determinate';
  form!: FormGroup;
  value: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private serEnrollmentService: SerEnrollmentService,
    private router: Router,
  ) {
    this.buildForm();
  }
  saveEnrollment(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const enrollment = this.form.value;
      this.serEnrollmentService.createEnrollment(enrollment)
        .subscribe((rtaObservable) => {
          this.router.navigate(['./enrollments']);
        });
    }
  }

  ngOnInit(): void {
   
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, MyValidators.palabrasValidas]],
      edad: ['', [Validators.required, MyValidators.edadValida]],
      fecha_nac: ['', [Validators.required, MyValidators.fechaValida]],
      fecha_inscripcion: ['', [Validators.required, MyValidators.fechaInscripcionMayorFechaNacimiento]],
      costo: ['', [Validators.required, MyValidators.costValidator]],
    });
  }
  get edadField() {
    return this.form.get('edad');
  }
  get nombreField() {
    return this.form.get('nombre');
  }

  get fechaNacField() {
    return this.form.get('fecha_nac');
  }
  get costoField() {
    return this.form.get('costo');
  }
  get fechaInscripcion() {
    return this.form.get('fecha_inscripcion');
  }
}

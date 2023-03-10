import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { SerEnrollmentService } from 'src/app/core/services/ser-enrollment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-enrollment-edit',
  templateUrl: './enrollment-edit.component.html',
  styleUrls: ['./enrollment-edit.component.scss']
})
export class EnrollmentEditComponent {
  form!: FormGroup;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private serEnrollmentService: SerEnrollmentService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }
  saveInscripcion() {
    const enrollment = this.form.value;
    this.serEnrollmentService.updateEnrollment(this.id, enrollment).subscribe(() => {
      this.router.navigate(['./enrollments']);
    });
  }
  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.serEnrollmentService.getEnrollment(this.id)
        .subscribe(enrollment => {
          let jsonElement = enrollment[0];
          this.form.get('fecha_nac')?.setValue(formatDate(jsonElement.fecha_nac, 'yyyy-MM-dd', 'en'));
          this.form.get('fecha_inscripcion')?.setValue(formatDate(jsonElement.fecha_inscripcion, 'yyyy-MM-dd', 'en'));
          const { fecha_nac, fecha_inscripcion, ...newJsonElement } = jsonElement;
          // Patch the updated newJsonElement object to the form
          this.form.patchValue(newJsonElement);
        });
    });
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, MyValidators.palabrasValidas]],
      edad: ['', [Validators.required, MyValidators.edadValida]],
      fecha_nac: ['', [Validators.required, MyValidators.fechaValida]],
      fecha_inscripcion: ['', [Validators.required, MyValidators.fechaMayorValidator]],
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

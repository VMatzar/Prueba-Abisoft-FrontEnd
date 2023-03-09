import { AbstractControl } from '@angular/forms';
export class MyValidators {
    static edadValida(control: AbstractControl): { [key: string]: boolean } | null {
        const edad = control.value;
        if (edad !== null && edad < 18) {
            return { edadInvalida: true };
        }
        return null;
    }

    static palabrasValidas(control: AbstractControl): { [key: string]: boolean } | null {
        const palabras = control.value ? control.value.trim().split(' ') : [];
        if (palabras.length !== 2) {
            return { palabrasInvalidas: true };
        }
        const palabra1 = palabras[0].match(/^[a-zA-Z]{1,4}$/);
        const palabra2 = palabras[1].match(/^[a-zA-Z]{1,4}$/);
        if (!palabra1 || !palabra2) {
            return { palabrasInvalidas: true };
        }
        return null;
    }

    static fechaValida(control: AbstractControl): { [key: string]: boolean } | null {
        const edad = control.parent?.get('edad')?.value;
        const fechaNacimiento = control.value;
        if (edad && fechaNacimiento) {
            const hoy = new Date();
            const fechaNac = new Date(fechaNacimiento);
            const edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
            fechaNac.setFullYear(hoy.getFullYear());
            if (edad <= edadCalculada) {
                return null;
            }
        }
        return { edadNoCoincide: true };
    }


    static costValidator(control: AbstractControl): { [key: string]: any } | null {
        const cost = control.value;
        const registrationDate = new Date(control.parent?.get('fecha_inscripcion')?.value);
        const currentDate = new Date();
        const yearsSinceRegistration = currentDate.getFullYear() - registrationDate.getFullYear();

        if (cost / (yearsSinceRegistration * 100) != 1) {
            return { invalidCost: true };
        } else {
            return null;
        }
    };

    static fechaInscripcionMayorFechaNacimiento(control: AbstractControl): { [key: string]: any } | null {
        const fechaNacimiento = control.get('fecha_nac')?.value;
        const fechaInscripcion = control.get('fecha_inscripcion')?.value;
      
        if (fechaInscripcion > fechaNacimiento) {
          return null; 
        } else {
          return { fechaInscripcionMayorFechaNacimiento: true }; 
        }
      }
}
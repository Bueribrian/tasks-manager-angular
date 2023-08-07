import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputErrorsService {

  constructor() { }

  public getErrorMessage(formControl: AbstractControl | null) : any {
    if(!formControl?.errors) return;
    
    const errors = Object.freeze({
      'required': 'Este campo es obligatorio',
      'minlength': `Este campo necesita un minimo de ${formControl.errors['minlength']?.requiredLength ?? 0} caracteres`,
      'maxlength': `Este campo acepta un maximo de ${formControl.errors['minlength']?.requiredLength ?? 0} caracteres`,
      'email': 'Ingrese un correo electronico valido'
    })
    
    if(formControl.hasError('required')) return errors['required'];
    if(formControl.hasError('minlength')) return errors['minlength'];
    if(formControl.hasError('maxlength')) return errors['maxlength'];
    if(formControl.hasError('email')) return errors['email'];
  }
}

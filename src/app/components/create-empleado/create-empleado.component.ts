import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submited: boolean = false;

  constructor(private fb: FormBuilder) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}

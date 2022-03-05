import { EmpleadoService } from './../../service/empleado.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submited: boolean = false;
  loading: boolean = false;
  id: string | null;
  titulo: string = 'Agregar empleado';

  constructor(
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarEmpleado();
  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      identificacion: this.createEmpleado.value.identificacion,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.loading = true;
    this._empleadoService
      .agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success(
          'Se creó un nuevo registro',
          '¡Empleado agregado!',
          {
            positionClass: 'toast-bottom-center',
            progressBar: true,
          }
        );
        this.loading = false;
        this.router.navigate(['/list-empleados']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  agregarEditar() {
    this.submited = true;

    if (this.createEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleadoFirebase(this.id);
    }
  }

  editarEmpleadoFirebase(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      identificacion: this.createEmpleado.value.identificacion,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('Empleado actualizado', 'Se modifico un registro', {
        positionClass: 'toast-bottom-center',
      });
      this.router.navigate(['/list-empleados']);
    });
  }

  editarEmpleado() {
    if (this.id !== null) {
      this.titulo = 'Editar empleado';
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe((data) => {
        this.loading = false;
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          identificacion: data.payload.data()['identificacion'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }
}

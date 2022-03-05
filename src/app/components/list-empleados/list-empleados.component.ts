import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from './../../service/empleado.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadoService
      .eliminarEmpleado(id)
      .then(() => {
        this.toastr.error('Empleado eliminado', 'Se eliminó un registro', {
          positionClass: 'toast-bottom-center',
          progressBar: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

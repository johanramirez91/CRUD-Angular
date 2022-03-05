import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-empleados',
    pathMatch: 'full',
  },
  {
    path: 'list-empleados',
    component: ListEmpleadosComponent,
  },
  {
    path: 'create-empleado',
    component: CreateEmpleadoComponent,
  },
  {
    path: 'edit-empleado/:id',
    component: CreateEmpleadoComponent,
  },
  {
    path: '**',
    redirectTo: 'list-empleados',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

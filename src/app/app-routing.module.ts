import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-mascotas', pathMatch: 'full' },
  { path: 'lista-mascotas', component: ListadoMascotaComponent },
  { path: 'agregar-mascota', component: AgregarEditarMascotaComponent },
  { path: 'ver-mascota/:id', component: VerMascotaComponent },
  { path: 'editar-mascota/:id', component: AgregarEditarMascotaComponent },
  { path: '**', redirectTo: 'lista-mascotas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

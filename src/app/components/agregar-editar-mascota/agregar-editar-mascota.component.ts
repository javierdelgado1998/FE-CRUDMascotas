import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.scss'],
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id!: number;
  operation!: string;

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    // Si no hay ID en la url el valor de la ruta es nulo pero al Parsearlo devuelve un 0, es util para identificar si el usuario entro para agregar o editar
  }

  ngOnInit(): void {
    this.id === 0 ? (this.operation = 'Agregar') : (this.operation = 'Editar');
    if (this.operation === 'Editar') {
      this.loading = true;
      this._mascotaService.getMascota(this.id).subscribe({
        next: (data) => {
          //Con this.form.setValue son todos los atributos, con patchValue solo los que vos consideres
          this.form.setValue({
            nombre: data.nombre,
            raza: data.raza,
            color: data.color,
            edad: data.edad,
            peso: data.peso,
          });
          this.loading = false;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
  }

  agregarEditarMascota(): void {
    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,
    };
    if (this.operation === 'Editar') {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }

  agregarMascota(mascota: Mascota): void {
    this.loading = true;
    this._mascotaService.postMascota(mascota).subscribe({
      next: () => {
        this.loading = false;
        this.form.reset();
        this.mensajeExito('La mascota fue registrada con exito', 'X');
        this.router.navigate(['/lista-mascotas']);
      },
      error: (e) => {
        this.loading = false;
        console.error(e);
      },
      complete: () => console.info('complete'),
    });
  }

  editarMascota(id: number, mascota: Mascota): void {
    mascota.id = id;
    this.loading = true;
    this._mascotaService.updateMascota(this.id, mascota).subscribe({
      next: () => {
        this.loading = false;
        this.form.reset();
        this.mensajeExito('La mascota fue actualizada con exito', 'X');
        this.router.navigate(['/lista-mascotas']);
      },
      error: (e) => {
        this.loading = false;
        console.error(e);
      },
      complete: () => console.info('complete'),
    });
  }

  mensajeExito(message: string, action?: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.scss'],
})
export class VerMascotaComponent implements OnInit {
  id: number;
  mascota!: Mascota;
  //mascota$!: Observable<Mascota>; PIPE ASYNC

  constructor(
    private _mascotaService: MascotaService,
    private _aRoute: ActivatedRoute
  ) {
    this.id = Number(this._aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerMascota(this.id);
  }

  obtenerMascota(id: number) {
    this._mascotaService.getMascota(id).subscribe({
      next: (data) => {
        this.mascota = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete'),
    });
  }

  /*   obtenerMascota(id: number): void {
    this.mascota$ = this._mascotaService.getMascota(id);
    console.log(this.mascota$);
  }  PIPE ASYNC */
}

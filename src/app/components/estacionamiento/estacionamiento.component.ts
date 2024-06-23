import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarestacionamientoComponent } from './listarestacionamiento/listarestacionamiento.component';

@Component({
  selector: 'app-estacionamiento',
  standalone: true,
  imports: [RouterOutlet, ListarestacionamientoComponent],
  templateUrl: './estacionamiento.component.html',
  styleUrl: './estacionamiento.component.css',
})
export class EstacionamientoComponent {
  constructor(public route: ActivatedRoute) {}
}

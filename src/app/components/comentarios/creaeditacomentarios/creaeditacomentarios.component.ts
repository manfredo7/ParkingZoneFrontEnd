import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Comentarios } from '../../../models/comentarios';
import { Estacionamiento } from '../../../models/estacionamiento';
import { ComentariosService } from '../../../services/comentarios.service';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditacomentarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditacomentarios.component.html',
  styleUrl: './creaeditacomentarios.component.css',
})
export class CreaeditacomentariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comentario: Comentarios = new Comentarios();
  listaEstacionamiento: Estacionamiento[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private cS: ComentariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eS: EstacionamientoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      puntuacion: [''],
      descripcion: [''],
      estacionamiento: [''],
    });
    this.eS.list().subscribe((data) => {
      this.listaEstacionamiento = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comentario.comentarioID = this.form.value.codigo;
      this.comentario.puntuacion = this.form.value.puntuacion;
      this.comentario.descripcion = this.form.value.descripcion;
      this.comentario.estacionamiento.idEstacionamiento =
        this.form.value.estacionamiento;

      if (this.edicion) {
        this.cS.update(this.comentario).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comentario).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['comentario']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.comentarioID),
          puntuacion: new FormControl(data.puntuacion),
          descripcion: new FormControl(data.descripcion),
          estacionamiento: new FormControl(
            data.estacionamiento.idEstacionamiento
          ),
        });
      });
    }
  }
}

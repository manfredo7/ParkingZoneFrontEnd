import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Membresia } from '../../../models/membresia';
import { MembresiaService } from '../../../services/membresia.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditamembresia',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './creaeditamembresia.component.html',
  styleUrl: './creaeditamembresia.component.css',
})
export class CreaeditamembresiaComponent implements OnInit {
  today?: Date;

  form: FormGroup = new FormGroup({});
  membresia: Membresia = new Membresia();

  edicionm: boolean = false;
  id: number = 0;

  constructor(
    private mS: MembresiaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionm = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      precio: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
      descuento: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.membresia.idMembresia = this.form.value.codigo;
      this.membresia.precioMembresia = this.form.value.precio;
      this.membresia.fechaInicioMembresia = this.form.value.fechaInicio;
      this.membresia.fechaFinMembresia = this.form.value.fechaFin;
      this.membresia.descripcionMembresia = this.form.value.descripcion;
      this.membresia.descuentoMembresia = this.form.value.descuento;
      if (this.edicionm) {
        this.mS.update(this.membresia).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.membresia).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['membresia']);
    }
  }
  init() {
    if (this.edicionm) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMembresia),
          precio: new FormControl(data.precioMembresia),
          fechaInicio: new FormControl(data.fechaInicioMembresia),
          fechaFin: new FormControl(data.fechaFinMembresia),
          descripcion: new FormControl(data.descripcionMembresia),
          descuento: new FormControl(data.descuentoMembresia),
        });
      });
    }
  }
}

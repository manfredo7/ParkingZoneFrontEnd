import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estacionamiento } from '../../../models/estacionamiento';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Testacionamiento } from '../../../models/testacionamiento';
import { TestacionamientoService } from '../../../services/testacionamiento.service';

@Component({
  selector: 'app-creaeditaestacionamiento',
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
  ],
  templateUrl: './creaeditaestacionamiento.component.html',
  styleUrl: './creaeditaestacionamiento.component.css',
})
export class CreaeditaestacionamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  estacionamiento: Estacionamiento = new Estacionamiento();
  listaTestacionamientos: Testacionamiento[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private eS: EstacionamientoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teS: TestacionamientoService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      capacidad: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      tarifa: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      hoperativo: ['', Validators.required],
      ventaja: ['', Validators.required],
      desventaja: ['', Validators.required],
      te: [''],
    });
    this.teS.list().subscribe((data) => {
      this.listaTestacionamientos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.estacionamiento.idEstacionamiento = this.form.value.codigo;
      this.estacionamiento.nombreEstacionamiento = this.form.value.nombre;
      this.estacionamiento.direccionEstacionamiento = this.form.value.direccion;
      this.estacionamiento.capacidadEstacionamiento = this.form.value.capacidad;
      this.estacionamiento.tarifaEstacionamiento = this.form.value.tarifa;
      this.estacionamiento.horarioperativoEstacionamiento =
        this.form.value.hoperativo;
      this.estacionamiento.ventajasEstacionamiento = this.form.value.ventaja;
      this.estacionamiento.desventajasEstacionamiento =
        this.form.value.desventaja;
      this.estacionamiento.testacionamiento.idTestacionamiento =
        this.form.value.te;
      if (this.edicion) {
        this.eS.update(this.estacionamiento).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.estacionamiento).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['estacionamiento']);
    }
  }
  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEstacionamiento),
          nombre: new FormControl(data.nombreEstacionamiento),
          direccion: new FormControl(data.direccionEstacionamiento),
          capacidad: new FormControl(data.capacidadEstacionamiento),
          tarifa: new FormControl(data.tarifaEstacionamiento),
          hoperativo: new FormControl(data.horarioperativoEstacionamiento),
          ventaja: new FormControl(data.ventajasEstacionamiento),
          desventaja: new FormControl(data.desventajasEstacionamiento),
          te: new FormControl(data.testacionamiento.idTestacionamiento),
        });
      });
    }
  }
}

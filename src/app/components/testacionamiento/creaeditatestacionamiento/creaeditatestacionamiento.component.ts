import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Testacionamiento } from '../../../models/testacionamiento';
import { TestacionamientoService } from '../../../services/testacionamiento.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditatestacionamiento',
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
  templateUrl: './creaeditatestacionamiento.component.html',
  styleUrl: './creaeditatestacionamiento.component.css',
})
export class CreaeditatestacionamientoComponent {
  form: FormGroup = new FormGroup({});
  testacionamiento: Testacionamiento = new Testacionamiento();

  edicionte: boolean = false;
  id: number = 0;

  constructor(
    private teS: TestacionamientoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  descripcion: { value: string; viewValue: string }[] = [
    { value: 'publico', viewValue: 'publico' },
    { value: 'privado', viewValue: 'privado' },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionte = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      medida: [
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
      this.testacionamiento.idTestacionamiento = this.form.value.codigo;
      this.testacionamiento.descripcionTestacionamiento =
        this.form.value.descripcion;
      this.testacionamiento.medidaTestacionamiento = this.form.value.medida;
      if (this.edicionte) {
        this.teS.update(this.testacionamiento).subscribe(() => {
          this.teS.list().subscribe((data) => {
            this.teS.setList(data);
          });
        });
      } else {
        this.teS.insert(this.testacionamiento).subscribe((data) => {
          this.teS.list().subscribe((data) => {
            this.teS.setList(data);
          });
        });
      }
      this.router.navigate(['testacionamiento']);
    }
  }
  init() {
    if (this.edicionte) {
      this.teS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTestacionamiento),
          descripcion: new FormControl(data.descripcionTestacionamiento),
          medida: new FormControl(data.medidaTestacionamiento),
        });
      });
    }
  }
}

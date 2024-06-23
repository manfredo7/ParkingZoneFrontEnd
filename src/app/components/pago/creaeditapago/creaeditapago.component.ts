import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Pago } from '../../../models/pago';
import { Tpago } from '../../../models/tpago';
import { PagoService } from '../../../services/pago.service';
import { TpagoService } from '../../../services/tpago.service';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-creaeditapago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgIf,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  templateUrl: './creaeditapago.component.html',
  styleUrl: './creaeditapago.component.css',
})
export class CreaeditapagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  listatpago: Tpago[] = [];
  id: number = 0;
  edicion: boolean = false;

  showSpinners = true;
  showSeconds = false;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  touchUi = false;
  color: 'primary' | 'accent' | 'warn' = 'primary';
  enableMeridian = true;
  disableMinute = false;
  hideTime = false;

  constructor(
    private pS: PagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tS: TpagoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      documento: ['', Validators.required],
      monto: [
        '',
        [
          Validators.required,
          Validators.min(5),
          Validators.max(1000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      fechahora: ['', Validators.required],
      tpago: ['', Validators.required],
    });
    this.tS.list().subscribe((data) => {
      this.listatpago = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pago.idPago = this.form.value.codigo;
      this.pago.documentoPago = this.form.value.documento;
      this.pago.montoPago = this.form.value.monto;
      this.pago.fechahoraPago = new Date(
        (this.form.value.fechahora as Date).getTime() - 5 * 60 * 60 * 1000
      ).toISOString();
      this.pago.tpago.tipoPagoID = this.form.value.tpago;

      if (this.edicion) {
        this.pS.update(this.pago).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.pago).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['pago']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPago),
          documento: new FormControl(data.documentoPago),
          monto: new FormControl(data.montoPago),
          fechahora: new FormControl(data.fechahoraPago),
          tpago: new FormControl(data.tpago.tipoPagoID),
        });
      });
    }
  }
}

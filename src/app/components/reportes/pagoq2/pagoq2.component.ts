import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-pagoq2',
  standalone: true,
  imports: [
    BaseChartDirective,
    FormsModule,
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
  templateUrl: './pagoq2.component.html',
  styleUrl: './pagoq2.component.css',
})
export class Pagoq2Component implements OnInit {
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

  form: FormGroup = new FormGroup({});

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: PagoService, private formBuilder: FormBuilder) {}

  handleSubmit() {
    const startDate = this.form.value.fechahora1 as Date;
    const endDate = this.form.value.fechahora2 as Date;

    this.pS
      .getTotalReservasRangoTiempo(startDate, endDate)
      .subscribe((data) => {
        this.barChartLabels = ['Monto total de todos los pagos'];
        this.barChartData = [
          {
            data: [data.pagoPedido],
            label: 'SumadePagos',
            backgroundColor: [
              '#C0504D',
              '#8064A2',
              '#4BACC6',
              '#9BBB59',
              '#4F81BC',
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechahora1: ['', Validators.required],
      fechahora2: ['', Validators.required],
    });
  }
}

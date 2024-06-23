import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsersService } from '../../../services/users.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-userq2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    CommonModule,
    BaseChartDirective,
  ],
  templateUrl: './userq2.component.html',
  styleUrl: './userq2.component.css',
})
export class Userq2Component implements OnInit {
  form: FormGroup = new FormGroup({});

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsersService, private formBuilder: FormBuilder) {}

  handleSubmit() {
    const startDate = this.form.value.finicio as Date;
    const endDate = this.form.value.ffin as Date;

    this.uS.getCountUsersPerDateRange(startDate, endDate).subscribe((data) => {
      console.log('Data received:', data);
      this.barChartLabels = ['Total de usuarios registrados'];
      this.barChartData = [
        {
          data: [data.nusuarios],
          label: 'Usuarios',
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
      finicio: ['', Validators.required],
      ffin: ['', Validators.required],
    });
  }
}

import { BaseChartDirective } from 'ng2-charts';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte01mhrxe-b',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte01mhrxe-b.component.html',
  styleUrl: './reporte01mhrxe-b.component.css',
})
export class Reporte01mhrxeBComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private eS: EstacionamientoService) {}

  ngOnInit(): void {
    this.eS.getmhrxe().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreEstacionamiento);
      this.barChartData = [
        {
          data: data.map((item) => item.horasReservadas),
          label: 'HorasReservadas',
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
}

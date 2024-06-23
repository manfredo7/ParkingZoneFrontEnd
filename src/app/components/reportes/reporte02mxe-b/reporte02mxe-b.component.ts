import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte02mxe-b',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte02mxe-b.component.html',
  styleUrl: './reporte02mxe-b.component.css',
})
export class Reporte02mxeBComponent implements OnInit {
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
    this.eS.getmxe().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreEstacionamiento);
      this.barChartData = [
        {
          data: data.map((item) => item.montoTotal),
          label: 'Monto',
          backgroundColor: [
            '#4BACC6',
            '#9BBB59',
            '#8064A2',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

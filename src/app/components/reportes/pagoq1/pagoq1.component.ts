import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-pagoq1',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pagoq1.component.html',
  styleUrl: './pagoq1.component.css',
})
export class Pagoq1Component {
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

  constructor(private pS: PagoService) {}

  ngOnInit(): void {
    this.pS.getpagomasutilizado().subscribe((data) => {
      console.log('[DATA]', data);

      this.barChartLabels = data.map((item) => item.descripcion_tpago);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad',
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

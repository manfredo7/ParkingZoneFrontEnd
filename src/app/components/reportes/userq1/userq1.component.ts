import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-userq1',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './userq1.component.html',
  styleUrl: './userq1.component.css',
})
export class Userq1Component {
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
  constructor(private uS: UsersService) {}

  ngOnInit(): void {
    this.uS.getumaxnreservas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.idreserva),
          label: 'cantidad de reservas',
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

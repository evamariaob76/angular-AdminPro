import { Component, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input () title: string='Nada';


  @Input ('labels')  doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input ('data')  doughnutChartData: MultiDataSet = [
    [400, 200, 140],

  ];
  public colores: Color[]=[
    {backgroundColor:['#9E120E', '#FF5800', '#FFb414']}
  ];
}

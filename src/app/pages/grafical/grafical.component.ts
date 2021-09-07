import { Component } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-grafical',
  templateUrl: './grafical.component.html',
  styles: [
  ]
})
export class GraficalComponent  {
  public labels1: string[]=['pan','refrecos', 'tacos'];
    public data1 = [
    [10, 15, 40],
  ];
}

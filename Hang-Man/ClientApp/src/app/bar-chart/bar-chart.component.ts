import { Component, Input, OnInit } from '@angular/core';
import { Graph } from '../graph.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
    @Input() List: Array<Graph>;

    public Total = 0;
    public MaxHeight = 160;

    constructor() { }

    ngOnInit() {
        this.MontarGrafico();
    }

    MontarGrafico() {
        this.List.forEach(element => {
            this.Total += element.Value;
        });

        this.List.forEach(element => {
            element.Size = Math.round((element.Value * this.MaxHeight) / this.Total) + '%';
        });
    }

}

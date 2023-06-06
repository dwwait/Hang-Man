import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'datepicker-inline-calendar',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
    selected: Date;
    minDate: Date;
    maxDate: Date;

    dateSelected: Date;
    dateSelectedString: string = null;
    today: Date;

    theme: string = "light";//default is dark, so make it empty to revert to dark-- 'light'

    ngOnInit() {  
        // this.today = new Date();
        // this.selected = this.today;
        // this.minDate = new Date(2022, 10, 1);
        // this.maxDate = new Date(this.today.getUTCFullYear(), this.today.getUTCMonth(), this.today.getDate());
    } 
    onSelect($event) {
        this.dateSelected = $event;
        this.dateSelected.toLocaleTimeString;

        var dateYear = this.dateSelected.getUTCFullYear();
        var dateMonth = this.dateSelected.getUTCMonth() + 1;//why is only this one 0 based index, jan is 0 
        var dateDay = this.dateSelected.getDate();
        this.dateSelectedString = dateYear + "/" + dateMonth + "/" + dateDay;
        document.getElementById('btnChooseDate').textContent = 'Kies ' + this.dateSelectedString;
    }
}

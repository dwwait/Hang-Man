import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    theme: string = "light";
    getUsersTheme() {
        //default is dark, so make it empty to revert to dark-- 'light'
        return "light";
    }
    //Al die user se shit moet ek nog uit figure, gaan die cookies se data wees,
    //sal device ip wees is al wat ek interseted is in, en dan al die res van die goed wat nodig is vir die 
    //cookies soos consent of what not 



    /*
     Moet hier n function maak om die scores te kry van die user hoeveel keer hulle 5 lewens en 4 lewens en what not gekry het, 
     en terug stuur in daai json object
*/
    score() {
        //hierdie is die initial een almal sal dieselfde kleur wees
        return [{ Value: 5, Color: '#475569', Size: '', Legend: '5' },
                { Value: 12, Color: '#475569', Size: '', Legend: '4' },
                { Value: 15, Color: '#475569', Size: '', Legend: '3' },
                { Value: 6, Color: '#475569', Size: '', Legend: '2' },
                { Value: 4, Color: '#475569', Size: '', Legend: '1' },
                { Value: 0, Color: '#475569', Size: '', Legend: 'X' }];
    }
    updateScore(ScoreToUpdate: any) {
        //update die score met een, nie rocket science nie

        //return die scores na die chart toe met die score wat verander as die odd color
        return [{ Value: 5, Color: '#475569', Size: '', Legend: '5' },
        { Value: 12, Color: '#475569', Size: '', Legend: '4' },
        { Value: 16, Color: '#1b6ec2', Size: '', Legend: '3' },
        { Value: 6, Color: '#475569', Size: '', Legend: '2' },
        { Value: 4, Color: '#475569', Size: '', Legend: '1' },
        { Value: 0, Color: '#475569', Size: '', Legend: 'X' }];
    }


    wordOFtheDay() {
        return "So min van iets weet as n aap van godsdiens";
    }
    /*Moet n function maak om enige woord wat geselect is terug te stuur*/
    wordOFYesterdayAndBeyond(SelectedDay: Date) {
        console.log(SelectedDay);
        return "Watookal die ander dag se idioom is";
    }

  constructor() { }
}

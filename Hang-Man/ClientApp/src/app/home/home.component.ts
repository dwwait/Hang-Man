import { Component, OnInit, HostListener } from '@angular/core';
import { Graph } from '../graph.model';


@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    //http://gesegdes.co.za/idiome/idiome.html
    wordOFtheDay: string = "So min van iets weet as n aap van godsdiens";
    dateTomorrow: Date;
    
    public Score: Array<Graph>; 
    ngOnInit() {
        this.wordOFtheDay = this.wordOFtheDay.toUpperCase();       
        const today = new Date();
        
        var styleString = 'font-size: 1.5vh;background-color: #475569;color: #fff;height: 2.25rem;width: 1.25rem;border: 1.5px;border-radius: 0.33rem;margin: 0.15rem;cursor: default; ';
        for (let i = 0; i < this.wordOFtheDay.length; i++)
        {
            if (this.wordOFtheDay.charAt(i) == " ")
                document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers" value="" style="${styleString} background-color: #25303E;"disabled></button>`);
            else 
                document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers" value="" style="${styleString}" disabled></button>`);
        }  
               
        document.getElementById('btnChooseDate').textContent = 'Kies ' + today.getUTCFullYear() + "/" + (today.getUTCMonth() + 1) + "/" + today.getDate();//Month is 0 index while rest is not
        
        this.dateTomorrow = new Date(`${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${(today.getDate()+1)}`);
        this.Score = [
            { Value: 5, Color: '#475569', Size: '', Legend: '5' },
            { Value: 12, Color: '#475569', Size: '', Legend: '4' },
            { Value: 15, Color: '#1b6ec2', Size: '', Legend: '3' },
            { Value: 6, Color: '#475569', Size: '', Legend: '2' },
            { Value: 4, Color: '#475569', Size: '', Legend: '1' },
            { Value: 0, Color: '#475569', Size: '', Legend: 'X' },
        ];         
    }       

    alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ];

    keyClicked: boolean[] = [false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false
    ];

    selectedKey: number = null;

    keyboardPress(item: number) {
        //wil die verander dat jy meer as een letter op n slag kan kies        
        var button = document.getElementById(`btn${item+1}`);
        if (this.keyClicked[item] == false && this.selectedKey == null) {
            button.style.backgroundColor = '#1E293B';
            button.style.border = '1px solid #fff';
            this.keyClicked[item] = true;
            this.selectedKey = item;
        }
        else if (this.keyClicked[item] == false && this.selectedKey != null) {
            var oldButton = document.getElementById(`btn${this.selectedKey+1}`);
            oldButton.style.backgroundColor = '#475569';
            oldButton.style.border = '';
            
            this.keyClicked[this.selectedKey] = false;

            button.style.backgroundColor = '#1E293B';
            button.style.border = '1px solid #fff';            
            this.keyClicked[item] = true;
            this.selectedKey = item;
        }
        else if (this.keyClicked[item] == true) {
            button.style.backgroundColor = '#475569';
            button.style.border = '';
            this.keyClicked[item] = false;
            this.selectedKey = null;
        }
    }

    attemptsTotal: number = 4;//Beteken mag net 4 verkeurd kry en continue met game, anders op  5de verkeurde attempt is game over
    attemptsFailed: number = 0;

    gameOver: boolean = false;
    submit() {
        if (this.selectedKey != null && this.gameOver == false) {
            var letter = this.alphabet[this.selectedKey];
            var button = document.getElementById(`btn${this.selectedKey + 1}`);
            if (this.wordOFtheDay.includes(letter)) {
                for (let i = 0; i < this.wordOFtheDay.length; i++) {
                    if (this.wordOFtheDay.charAt(i) == letter) {
                        document.getElementById(`btnAnswer${i}`).textContent = letter;
                    }
                }
                //need to disable btn on keyboard and set selected btn to null;
                button.style.backgroundColor = '#1E293B';
                button.style.border = '';
                button.style.color = 'greenyellow';                
                button.setAttribute('disabled', 'disabled');
                button.style.opacity = '1';
                this.keyClicked[this.selectedKey] = false;
                this.selectedKey = null;
            }
            else {
                
                //need to disable btn on keyboard and set selected btn to null;
                button.style.backgroundColor = '#1E293B';
                button.style.border = '';
                button.style.color = 'red';
                button.setAttribute('disabled', 'disabled');
                button.style.opacity = '1';
                this.keyClicked[this.selectedKey] = false;
                this.selectedKey = null;

                var buttonTest = document.getElementById(`wrong${this.attemptsFailed}`);
                //play anitmation - for now its just the buttons
                if (this.attemptsFailed < this.attemptsTotal) {                    
                    buttonTest.style.backgroundColor = 'red';
                    buttonTest.textContent = 'X';
                    this.attemptsFailed++;
                }
                else {//game over
                    buttonTest.style.backgroundColor = 'red';
                    buttonTest.textContent = 'X';      
                    document.getElementById(`response`).removeAttribute('hidden');
                    this.gameOver = true;
                }
            }
        }     
    }

    info(item: string) {
        switch (item) {
            case 'info':
                document.getElementById(`infoHeader`).textContent = 'Hoe om te speel';
                document.getElementById(`infotext`).style.display = 'inline';
                document.getElementById(`erkenningtext`).style.display = 'none';
                document.getElementById(`settingstext`).style.display = 'none';
                break;
            case 'erkenning':
                document.getElementById(`infoHeader`).textContent = 'Erkenning';
                document.getElementById(`erkenningtext`).style.display = 'inline';
                document.getElementById(`infotext`).style.display = 'none';
                document.getElementById(`settingstext`).style.display = 'none';
                break;
            case 'settings':
                document.getElementById(`infoHeader`).textContent = 'Instellings';
                document.getElementById(`settingstext`).style.display = 'inline';
                document.getElementById(`infotext`).style.display = 'none';
                document.getElementById(`erkenningtext`).style.display = 'none';

                break;
            default:
                document.getElementById(`infoHeader`).textContent = 'Hoe om te speel';
                document.getElementById(`infotext`).style.display = 'inline';
                document.getElementById(`erkenningtext`).style.display = 'none';
                document.getElementById(`settingstext`).style.display = 'none';
                break;
        }
    }   
}
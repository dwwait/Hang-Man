import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { Graph } from '../graph.model';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private dataService: DataService) { }

    theme: string = this.dataService.getUsersTheme();//default is dark, so make it empty to revert to dark-- 'light'

    //http://gesegdes.co.za/idiome/idiome.html
    wordOFtheDay: string = "So min van iets weet as n aap van godsdiens";
    dateTomorrow: Date;
    
    public Score: Array<Graph>; 
    ngOnInit() {
        this.wordOFtheDay = this.wordOFtheDay.toUpperCase();       
        const today = new Date();
                
        for (let i = 0; i < this.wordOFtheDay.length; i++)
        {
            if (this.wordOFtheDay.charAt(i) == " ") {
                if(this.theme != 'light')
                    document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers" style="background-color: #25303E;"disabled></button>`);
                else
                    document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers light" style="background-color: #afb9c4;"disabled></button>`);
            }
            else {
                if (this.theme != 'light')
                    document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers"  disabled></button>`);
                else
                    document.getElementById("lettersBtns").insertAdjacentHTML('beforeend', `<button id="btnAnswer${i}" class="btn-answers light" disabled></button>`);

            }
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
        "U", "V", "W", "X", "Y", "Z"];

    keyClicked: boolean[] = [false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false];

    keyboardPress(item: number) {
        //wil die verander dat jy meer as een letter op n slag kan kies        
        var button = document.getElementById(`btn${item + 1}`);
        if (this.keyClicked[item] == false) {
            if (this.theme != 'light') {
                button.style.backgroundColor = '#1E293B';
                button.style.border = '1px solid #fff';
            }
            else {
                button.style.backgroundColor = '#afb9c4';
                button.style.border = '1px solid #000000';
            }
            
            this.keyClicked[item] = true;
        }
        else if (this.keyClicked[item] == true) {
            if (this.theme != 'light') {
                button.style.backgroundColor = '#475569';
                button.style.border = '';
            }
            else {
                button.style.backgroundColor = '#E2E8F0';
                button.style.border = '';
            }            
            this.keyClicked[item] = false;
        }    
    }
    
    submit() {
        var buttonEnter = document.getElementById('enter');

        if (this.theme != 'light') {
            buttonEnter.style.backgroundColor = '#334155';
            buttonEnter.style.color = 'greenyellow';
        }
        else {
            buttonEnter.style.backgroundColor = '#afb9c4';
            buttonEnter.style.color = '#0a0ed7';
        }
        
        if (this.gameOver == false) {
            this.keyClicked.forEach((item,index) => {
                if (item == true && this.gameOver == false) {
                    var letter = this.alphabet[index];
                    var button = document.getElementById(`btn${index + 1}`);
                    if (this.wordOFtheDay.includes(letter)) {
                        for (let i = 0; i < this.wordOFtheDay.length; i++) {
                            if (this.wordOFtheDay.charAt(i) == letter) {
                                document.getElementById(`btnAnswer${i}`).textContent = letter;
                            }
                        }
                        //need to disable btn on keyboard and set selected btn to null;
                        if (this.theme != 'light') {
                            button.style.backgroundColor = '#1E293B';
                            button.style.border = '';
                            button.style.color = 'greenyellow';
                            button.setAttribute('disabled', 'disabled');
                            button.style.opacity = '1';
                        }
                        else {
                            button.style.backgroundColor = '#8d98a3';
                            button.style.border = '';
                            button.style.color = 'greenyellow';
                            button.setAttribute('disabled', 'disabled');
                            button.style.opacity = '1';
                        }
                        this.keyClicked[index] = false;

                        this.checkGameOver();
                    }
                    else {
                        //need to disable btn on keyboard and set selected btn to null;
                        if (this.theme != 'light') {
                            button.style.backgroundColor = '#1E293B';
                            button.style.border = '';
                            button.style.color = 'red';
                            button.setAttribute('disabled', 'disabled');
                            button.style.opacity = '1';
                        }
                        else {
                            button.style.backgroundColor = '#8d98a3';
                            button.style.border = '';
                            button.style.color = 'red';
                            button.setAttribute('disabled', 'disabled');
                            button.style.opacity = '1';
                        }
                        
                        this.keyClicked[index] = false;

                        var buttonTest = document.getElementById(`wrong${this.attemptsFailed}`);
                        //play anitmation - for now its just the buttons
                        if (this.attemptsFailed < this.attemptsTotal) {
                            buttonTest.style.backgroundColor = 'red';
                            buttonTest.textContent = 'X';
                            this.attemptsFailed++;
                            if (this.attemptsFailed == 4) {
                                document.getElementById('btnhint').setAttribute('disabled', 'disabled');
                            }
                        }
                        else {//game over
                            buttonTest.style.backgroundColor = 'red';
                            buttonTest.textContent = 'X';
                            document.getElementById(`response`).removeAttribute('hidden');
                            this.gameOver = true;
                        }
                    }
                }
            });
            
        }
        setTimeout(() => {
            if (this.theme != 'light') {
                buttonEnter.style.backgroundColor = '#475569';
                buttonEnter.style.color = '#fff';
            }
            else {
                buttonEnter.style.backgroundColor = '#E2E8F0';
                buttonEnter.style.color = '#000000';
            }
        }, 150);
        
    }
    attemptsTotal: number = 4;//Beteken mag net 4 verkeurd kry en continue met game, anders op  5de verkeurde attempt is game over
    attemptsFailed: number = 0;

    gameOver: boolean = false;
    

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
                break;
        }
    }    

    gothintletter: boolean = false;
    giveHint() {
        //get open letter in word of the day thats not been selected, display it in list, then disable button
        
        if (this.gameOver != true) {
            //if charAt in this.wordOFtheDay not a space and btnAnswers not filled in yet
            var letter;
            while (this.gothintletter != true) {
                let randomIndex = Math.floor(Math.random() * (this.wordOFtheDay.length - 1) + 1); //get random index
                
                if (this.wordOFtheDay.charAt(randomIndex) != ' ' && document.getElementById(`btnAnswer${randomIndex}`).textContent == '') {
                    letter = this.wordOFtheDay.charAt(randomIndex);
                    this.gothintletter = true;
                }
            }
            var letterIndex = this.alphabet.indexOf(letter);

            var button = document.getElementById(`btn${letterIndex + 1}`); //get index of letter
            for (let i = 0; i < this.wordOFtheDay.length; i++) {
                if (this.wordOFtheDay.charAt(i) == letter) {
                    document.getElementById(`btnAnswer${i}`).textContent = letter;                    
                }
            }
            //need to disable btn on keyboard and set selected btn to null;
            if (this.theme != 'light') {
                button.style.backgroundColor = '#1E293B';
                button.style.border = '';
                button.style.color = 'greenyellow';
                button.setAttribute('disabled', 'disabled');
                button.style.opacity = '1';
            }
            else {
                button.style.backgroundColor = '#8d98a3';
                button.style.border = '';
                button.style.color = 'greenyellow';
                button.setAttribute('disabled', 'disabled');
                button.style.opacity = '1';
            }
         
            this.keyClicked[letterIndex] = false; //make the selected letter false incase they pressed button, then hint,


            var buttonTest = document.getElementById(`wrong${this.attemptsFailed}`);
            //play anitmation - for now its just the buttons
            if (this.attemptsFailed < this.attemptsTotal) {
                buttonTest.style.backgroundColor = 'red';
                buttonTest.textContent = 'X';
                this.attemptsFailed++;
                if (this.attemptsFailed == 4) {
                    document.getElementById('btnhint').setAttribute('disabled', 'disabled');
                }
                this.checkGameOver();
            }
            else {//game over
                buttonTest.style.backgroundColor = 'red';
                buttonTest.textContent = 'X';
                document.getElementById(`response`).removeAttribute('hidden');
                this.gameOver = true;
            }
            this.gothintletter = false;
        }
        
    }
    checkGameOver() {
        let gameWon: boolean = true;
        for (let i = 0; i < this.wordOFtheDay.length; i++) {
            if (document.getElementById(`btnAnswer${i}`).textContent == '' && this.wordOFtheDay.charAt(i) != ' ') {
                gameWon = false;
            }
        }
        
        if (gameWon == true) {
            this.gameOver = true;
            document.getElementById(`response`).style.color = 'greenyellow';
            document.getElementById(`response`).textContent = 'YOU WON';
            document.getElementById(`response`).removeAttribute('hidden');
        }
    }
}

document.addEventListener('keydown', function (event) { 
    switch (event.code) {
        case 'Enter':     
        case 'NumpadEnter':
            document.getElementById('enter').click();
            break;
        case 'KeyA':
            document.getElementById('btn1').click();
            break;
        case 'KeyB':
            document.getElementById('btn2').click();
            break;
        case 'KeyC':
            document.getElementById('btn3').click();
            break;
        case 'KeyD':
            document.getElementById('btn4').click();
            break;
        case 'KeyE':
            document.getElementById('btn5').click();
            break;
        case 'KeyF':
            document.getElementById('btn6').click();
            break;
        case 'KeyG':
            document.getElementById('btn7').click();
            break;
        case 'KeyH':
            document.getElementById('btn8').click();
            break;
        case 'KeyI':
            document.getElementById('btn9').click();
            break;
        case 'KeyJ':
            document.getElementById('btn10').click();
            break;
        case 'KeyK':
            document.getElementById('btn11').click();
            break;
        case 'KeyL':
            document.getElementById('btn12').click();
            break;
        case 'KeyM':
            document.getElementById('btn13').click();
            break;
        case 'KeyN':
            document.getElementById('btn14').click();
            break;
        case 'KeyO':
            document.getElementById('btn15').click();
            break;
        case 'KeyP':
            document.getElementById('btn16').click();
            break;
        case 'KeyQ':
            document.getElementById('btn17').click();
            break;
        case 'KeyR':
            document.getElementById('btn18').click();
            break;
        case 'KeyS':
            document.getElementById('btn19').click();
            break;
        case 'KeyT':
            document.getElementById('btn20').click();
            break;
        case 'KeyU':
            document.getElementById('btn21').click();
            break;
        case 'KeyV':
            document.getElementById('btn22').click();
            break;
        case 'KeyW':
            document.getElementById('btn23').click();
            break;
        case 'KeyX':
            document.getElementById('btn24').click();
            break;
        case 'KeyY':
            document.getElementById('btn25').click();
            break;
        case 'KeyZ':    
            document.getElementById('btn26').click();
            break;
        default:
            break;
    }
});
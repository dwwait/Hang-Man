import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    theme: string = "light";//default is dark, so make it empty to revert to dark-- 'light'
  constructor() { }
}

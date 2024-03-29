import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
// import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
// import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
// import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/datepicker';
import { CalenderComponent } from './calender/calender.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
// import { CountdownTimerModule } from 'angular-countdown-timer';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { NativeDateModule } from '@angular/material/core';
// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
    declarations: [    
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    CalenderComponent,
    BarChartComponent
    ],
    imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
    ]),
    BrowserAnimationsModule,
    MatDatepickerModule,
    // CountdownTimerModule,
    MatCardModule,
    MatInputModule,
    NativeDateModule,
    // ModuleMapLoaderModule
    
  ],
  providers: [
      // { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//TODO
//info- moet nog darkmode/lightmode toggle insit, en erkennings
//Bietjie animation vir as n regte letter gekies is en hy display in die word list
//game over moet die stats modal oop maak, met jou score, en weet nie hoe die data lyk nie maar maybe die betekenes van die idoom
//en wat as jy we oopmaak maar jy het die game kla gespeel, moet hy oop maak met die stats modal of nah?z
//share jou stats -- copy to clipboard
//actual data
//cookies
//db

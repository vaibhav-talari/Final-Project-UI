import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AddprojectComponent } from './components/addproject/addproject.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { IndexComponent } from './components/index/index.component';

var navPaths:Routes=[
  {path:'',component:IndexComponent},
  {path:'addtask',component:AddtaskComponent},
  {path:'addproject',component:AddprojectComponent},
  {path:'adduser',component:AdduserComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdduserComponent,
    AddprojectComponent,
    AddtaskComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(navPaths),
    FilterPipeModule,OrderModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

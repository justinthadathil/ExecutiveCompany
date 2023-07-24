import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppExecutivesGroupComponent } from './app-executives-group/app-executives-group.component';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';
import { AppExecutivesComponent } from './app-executives/app-executives.component';
import { AppBaseComponent } from './app-base/app-base.component';

@NgModule({
  declarations: [
    AppComponent,
    AppExecutivesGroupComponent,
    AppSidenavComponent,
    AppExecutivesComponent,
    AppBaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

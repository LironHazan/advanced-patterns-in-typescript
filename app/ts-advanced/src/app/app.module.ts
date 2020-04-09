import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DiUiComponent} from "./di/di-ui/di-ui.component";
import { TsCanvasAnimComponent } from './components/ts-canvas-anim/ts-canvas-anim.component';

@NgModule({
  declarations: [
    AppComponent,
    DiUiComponent,
    TsCanvasAnimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

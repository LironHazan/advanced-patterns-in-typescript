import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiUiComponent} from "./di/di-ui/di-ui.component";


const routes: Routes = [
  {
    path: 'di',
    component: DiUiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


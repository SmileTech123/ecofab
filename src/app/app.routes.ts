import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConfrontaComponent} from './confronta/confronta.component';
import {MovimentiComponent} from './movimenti/movimenti.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'confronta', component: ConfrontaComponent},
  {path: 'movimenti', component: MovimentiComponent},
];

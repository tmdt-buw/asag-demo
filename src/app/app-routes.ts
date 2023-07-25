import { Routes } from "@angular/router"

export const routes: Routes = [
  { path: '', loadChildren: () => import('./demonstrator/demonstrator.module').then(m => m.DemonstratorModule)}
];

import { Routes } from "@angular/router"

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '', loadChildren: () => import('./demonstrator/demonstrator.module').then(m => m.DemonstratorModule)},
  { path: 'impressum', loadChildren: () => import ('./impressum/impressum.module').then(m => m.ImpressumModule) }
];

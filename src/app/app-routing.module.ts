import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AboutComponent } from './components/about/about.component';
import { IntroComponent } from './components/intro/intro.component';
import { StuffComponent } from './components/stuff/stuff.component';
const routes: Routes = [
  {
    path: 'home',
    component: IntroComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'stuff',
    component: StuffComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

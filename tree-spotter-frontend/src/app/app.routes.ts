import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DisplayComponent } from './display/display.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomepageComponent, title: 'Home Page' }, // Homepage as the default route
  { path: 'display', component: DisplayComponent, title: 'Display Page' }, // API interaction page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

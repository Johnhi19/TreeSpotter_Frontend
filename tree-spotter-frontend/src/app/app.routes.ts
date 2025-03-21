import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TreesComponent } from './trees/trees.component';
import { HomeComponent } from './home/home.component';
import { MeadowDetailComponent } from './meadow-detail/meadow-detail.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'trees', 
    component: TreesComponent,
    children: [
      {path: ':id', component: TreesComponent}
    ]
  },
  {path: 'meadow/:id', component: MeadowDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreesComponent } from './tree-info/trees/trees.component';
import { HomeComponent } from './home/home.component';
import { MeadowDetailComponent } from './meadow-detail/meadow-detail.component';
import { AddTreeComponent } from './tree-info/add-tree/add-tree.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trees/:id', component: TreesComponent},
  {path: 'meadow/:id', component: MeadowDetailComponent},
  {path: 'add-tree/:meadowId', component: AddTreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreesComponent } from './tree-info/trees/trees.component';
import { HomeComponent } from './home/home.component';
import { MeadowDetailComponent } from './meadow-info/meadow-detail/meadow-detail.component';
import { AddTreeComponent } from './tree-info/add-tree/add-tree.component';
import { AddMeadowComponent } from './meadow-info/add-meadow/add-meadow.component';
import { AuthComponent } from './authentication/components/auth.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { AuthGuard } from './authentication/auth.guard';
import { UploadTreeImageComponent } from './upload-tree-image/upload-tree-image.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'trees/:id', component: TreesComponent, canActivate: [AuthGuard]},
  {path: 'trees/:id/uploadImage', component: UploadTreeImageComponent, canActivate: [AuthGuard]},
  {path: 'meadow/:id', component: MeadowDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-tree/:meadowId', component: AddTreeComponent, canActivate: [AuthGuard]},
  {path: 'add-meadow', component: AddMeadowComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

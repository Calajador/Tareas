import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListTaskComponent } from './pages/list-task/list-task.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateListComponent } from './pages/create-list/create-list.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '' , component:LoginComponent, pathMatch:'full'},
  {path: 'singup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'create-list', component: CreateListComponent, canActivate:[AuthGuard]},
  {path:'profile/lists/:listId', component:ListTaskComponent, canActivate:[AuthGuard]},
  {path: 'profile/lists/:listId/create-task', component:CreateTaskComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

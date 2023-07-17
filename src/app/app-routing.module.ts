import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserAuthenticatedGuard } from './modules/auth/guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tasks',
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  {
    path: '**',
    redirectTo: '/tasks'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

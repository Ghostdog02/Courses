import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  {
    path: 'create',
    component: PostCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

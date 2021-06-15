import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/auth/auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path:'',
  //   component:DashboardComponent,
  //   children : [
  //   {
  //     path:'products',
  //   }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule],  
  providers: [AuthGuard]

})
export class AppRoutingModule { }

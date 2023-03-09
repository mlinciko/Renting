import { NgModule } from '@angular/core';
import { AuthRootComponent } from './components/auth-root/auth-root.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';

const routes: Routes = [
  {
    path: '',
    component: AuthRootComponent,
    children:[
      {
        path: '',
        component: DefaultComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registry',
        component: RegistryComponent,
      },
    ]
  },
  { path: "**", redirectTo: "/" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

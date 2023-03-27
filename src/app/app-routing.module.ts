import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from './interceptors/token.interceptor';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "sign",
        loadChildren: () =>
          import("./modules/auth/auth.module").then(
            (m) => m.AuthModule
          ),
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ]
})
export class AppRoutingModule { }

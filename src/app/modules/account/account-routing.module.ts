import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRootComponent } from './components/account-root/account-root.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAnnouncementsComponent } from './components/my-announcements/my-announcements.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: "",
    component: AccountRootComponent,
    children: [
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "my-announcements",
        component: MyAnnouncementsComponent,
      },
      {
        path: "help-center",
        component: HelpCenterComponent,
        children: [
          {
            path: "faq",
            component: FaqComponent
          },
          {
            path: "contact-us",
            component: ContactUsComponent
          }
        ]
      }
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "my-announcements"},
  { path: "**", redirectTo: "all" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

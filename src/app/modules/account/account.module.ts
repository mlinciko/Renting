import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRootComponent } from './components/account-root/account-root.component';
import { AccountRootMenuComponent } from './components/account-root-menu/account-root-menu.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './services/account.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadAvatarDialogComponent } from './components/upload-avatar-dialog/upload-avatar-dialog.component';
import { DevExtremeModule } from 'devextreme-angular';
import { SharedModule } from '../shared/shared.module';
import { MyAnnouncementsComponent } from './components/my-announcements/my-announcements.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';



@NgModule({
  declarations: [
    AccountRootComponent,
    AccountRootMenuComponent,
    ProfileComponent,
    UploadAvatarDialogComponent,
    MyAnnouncementsComponent,
    HelpCenterComponent,
    FaqComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    DevExtremeModule,
    SharedModule
  ],
  providers: [AccountService]
})
export class AccountModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnnouncementTypePipe } from '../catalog/pipes/announcement-type.pipe';



@NgModule({
  declarations: [
    CatalogComponent,
    AnnouncementTypePipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CatalogComponent,
  ],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogRootComponent } from './components/catalog-root/catalog-root.component';
import { FamilyHouseComponent } from './components/family-house/family-house.component';
import { LandComponent } from './components/land/land.component';
import { AppartmentComponent } from './components/appartment/appartment.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AnnouncementTypePipe } from './pipes/announcement-type.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CatalogRootComponent,
    FamilyHouseComponent,
    LandComponent,
    AppartmentComponent,
    CatalogComponent,
    AnnouncementTypePipe
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FontAwesomeModule,
  ]
})
export class CatalogModule { }

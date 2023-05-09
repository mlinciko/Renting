import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogRootComponent } from './components/catalog-root/catalog-root.component';
import { FamilyHouseComponent } from './components/family-house/family-house.component';
import { LandComponent } from './components/land/land.component';
import { AppartmentComponent } from './components/appartment/appartment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { FilterService } from './services/filter.service';
import { AllComponent } from './components/all/all.component';
import { DevExtremeModule } from '../dev-extreme/dev-extreme.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AddAnnouncementComponent } from './components/add-announcement/add-announcement.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddRegionModalComponent } from './components/add-region-modal/add-region-modal.component';
import { AddStreetModalComponent } from './components/add-street-modal/add-street-modal.component';
import { AddCityModalComponent } from './components/add-city-modal/add-city-modal.component';
import { AddHouseComponent } from './components/add-house/add-house.component';
import { AddHouseMaterialModalComponent } from './components/add-house-material-modal/add-house-material-modal.component';
import { AddAnnouncementService } from './services/add-announcement.service';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadImagesToAnnComponent } from './components/upload-images-to-ann/upload-images-to-ann.component';



@NgModule({
  declarations: [
    CatalogRootComponent,
    FamilyHouseComponent,
    LandComponent,
    AppartmentComponent,
    FilterPanelComponent,
    AllComponent,
    AnnouncementComponent,
    AddAnnouncementComponent,
    AddAddressComponent,
    AddRegionModalComponent,
    AddStreetModalComponent,
    AddCityModalComponent,
    AddHouseComponent,
    AddHouseMaterialModalComponent,
    AddPropertyComponent,
    DashboardComponent,
    UploadImagesToAnnComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FontAwesomeModule,
    SharedModule,
    DevExtremeModule,
  ],
  providers: [FilterService, AddAnnouncementService]
})
export class CatalogModule { }

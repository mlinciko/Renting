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



@NgModule({
  declarations: [
    CatalogRootComponent,
    FamilyHouseComponent,
    LandComponent,
    AppartmentComponent,
    FilterPanelComponent,
    AllComponent,
    AnnouncementComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FontAwesomeModule,
    SharedModule,
    DevExtremeModule,
  ],
  providers: [FilterService]
})
export class CatalogModule { }

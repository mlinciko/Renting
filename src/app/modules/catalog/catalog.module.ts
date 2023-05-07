import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogRootComponent } from './components/catalog-root/catalog-root.component';
import { FamilyHouseComponent } from './components/family-house/family-house.component';
import { LandComponent } from './components/land/land.component';
import { AppartmentComponent } from './components/appartment/appartment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CatalogRootComponent,
    FamilyHouseComponent,
    LandComponent,
    AppartmentComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class CatalogModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogRootComponent } from './components/catalog-root/catalog-root.component';
import { FamilyHouseComponent } from './components/family-house/family-house.component';
import { AppartmentComponent } from './components/appartment/appartment.component';
import { LandComponent } from './components/land/land.component';
import { AllComponent } from './components/all/all.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogRootComponent,
    children: [
      {
        path: 'all',
        component: AllComponent,
      },
      {
        path: 'family-house',
        component: FamilyHouseComponent,
      },
      {
        path: 'apartment',
        component: AppartmentComponent,
      },
      {
        path: 'land',
        component: LandComponent,
      },
      { path: "", pathMatch: "full", redirectTo: "all"},
      { path: "**", redirectTo: "all" },
    ]
  },
  { path: "", pathMatch: "full", redirectTo: "all"},
  { path: "**", redirectTo: "all" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }

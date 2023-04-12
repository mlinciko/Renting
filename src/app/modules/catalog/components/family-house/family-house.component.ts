import { Component } from '@angular/core';
import { CatalogRootComponent } from '../catalog-root/catalog-root.component';
import { FamilyHouseAnnouncementService } from '../../services/announcement-init';

@Component({
  selector: 'app-family-house',
  templateUrl: './family-house.component.html',
  styleUrls: ['./family-house.component.scss'],
  providers: [FamilyHouseAnnouncementService]
})
export class FamilyHouseComponent extends CatalogRootComponent {

  override getAnnouncements(): void {
    this.announcement.getAnnouncementsByType()
    .subscribe(
      (res) => this.announcements = res
    )
  }
}

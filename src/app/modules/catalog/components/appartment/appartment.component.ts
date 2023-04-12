import { Component } from '@angular/core';
import { CatalogRootComponent } from '../catalog-root/catalog-root.component';
import { ApartmentAnnouncementService } from '../../services/announcement-init';

@Component({
  selector: 'app-appartment',
  templateUrl: './appartment.component.html',
  styleUrls: ['./appartment.component.scss'],
  providers: [ApartmentAnnouncementService],
})
export class AppartmentComponent extends CatalogRootComponent {

  override getAnnouncements(): void {
    this.announcement.getAnnouncementsByType()
    .subscribe(
      (res) => this.announcements = res
    )
  }

}

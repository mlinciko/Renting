import { Component } from '@angular/core';
import { CatalogRootComponent } from '../catalog-root/catalog-root.component';
import { LandAnnouncementService } from '../../services/announcement-init';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss'],
  providers: [LandAnnouncementService],
})
export class LandComponent extends CatalogRootComponent {

  override getAnnouncements(): void {
    this.announcement.getAnnouncementsByType()
    .subscribe(
      (res) => this.announcements = res
    )
  }
}

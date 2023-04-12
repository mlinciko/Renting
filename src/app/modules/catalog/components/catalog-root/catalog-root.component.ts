import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { DefaultAnnouncementService } from '../../services/announcement-init';
import { IAnnouncement } from '../../models/announcement';

@Component({
  selector: 'app-catalog-root',
  templateUrl: './catalog-root.component.html',
  styleUrls: ['./catalog-root.component.scss'],
  providers: [DefaultAnnouncementService],
})
export class CatalogRootComponent implements OnInit {
  announcements!: IAnnouncement[];
  constructor(
    protected announcement: AnnouncementService,
  ) { }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcement.getAllOpenAnnouncements()
    .subscribe(
      (res) => this.announcements = res
    )
  }

}

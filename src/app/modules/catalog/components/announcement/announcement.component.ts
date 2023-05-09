import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncement } from '../../models/announcement';
import { DefaultAnnouncementService } from '../../services/announcement-init';
import { AnnouncementService } from '../../services/announcement.service';
import { ImageService } from 'src/app/services/image.service';
import { faLocationArrow, faStar, faUserCircle, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  providers: [DefaultAnnouncementService]
})
export class AnnouncementComponent implements OnInit {
  announcementId: number | null;
  announcement!: IAnnouncement;
  
  starIcon = faStar;
  locationIcon = faLocationArrow;
  squareIcon = faVectorSquare;
  noImageIcon = faUserCircle;

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private annService: AnnouncementService,
    private imageService: ImageService,
  ) {
    const id = this.route.snapshot.paramMap?.get("id")
    this.announcementId = id ? +id : null;
   }

  ngOnInit(): void {
    this.loadAnnouncement();
  }

  loadAnnouncement(): void {
    if (!this.announcementId) {
      return;
    }
    this.loading = true;
    this.annService.getAnnouncementById(this.announcementId)
    .pipe(finalize(() => this.loading = false))
    .subscribe(
      (res) => {
        this.announcement = res;
      }
    )
  }

  getAnnImage(index: number): string {
    if (this.announcement.imagePathList[index]) {
      return this.imageService.getFullImagePath(this.announcement.imagePathList[index]);
    }
    return "../../../../../assets/images/no-image.png"
  }

  getUserImage(imagePath: string): string {
    return this.imageService.getFullImagePath(imagePath);
  }

  writeToOwner(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncement } from '../../models/announcement';
import { DefaultAnnouncementService } from '../../services/announcement-init';
import { AnnouncementService } from '../../services/announcement.service';
import { ImageService } from 'src/app/services/image.service';
import { faLocationArrow, faStar, faUserCircle, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  providers: [CommonService, DefaultAnnouncementService]
})
export class AnnouncementComponent implements OnInit {
  announcementId: number | null;
  status: string | null;
  announcement!: IAnnouncement;
  
  starIcon = faStar;
  locationIcon = faLocationArrow;
  squareIcon = faVectorSquare;
  noImageIcon = faUserCircle;

  loading: boolean = false;
  currentUserId!: number;

  constructor(
    private route: ActivatedRoute,
    private annService: AnnouncementService,
    private imageService: ImageService,
    private user: UserService,
  ) {
    const id = this.route.snapshot.paramMap?.get("id")
    const status = this.route.snapshot.paramMap?.get("status")
    this.announcementId = id ? +id : null;
    this.status = status ? status : null;
   }

  ngOnInit(): void {
    this.currentUserId = this.user.user.value.id;
    this.loadAnnouncement();
  }

  loadAnnouncement(): void {
    if (!this.announcementId || !this.status) {
      return;
    }
    this.loading = true;
    if (this.status === "open") {
      this.annService.getAnnouncementById(this.announcementId)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (res) => {
          this.announcement = res;
        }
      )
    } else {
      this.annService.getHiddenAnnouncementById(this.announcementId)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (res) => {
          this.announcement = res;
        }
      )
    }
    
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

  reload(): void {
    this.loadAnnouncement();
  }

}

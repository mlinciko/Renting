import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { faDollarSign, faLocationArrow, faStar } from '@fortawesome/free-solid-svg-icons';
import { IAnnouncement } from 'src/app/modules/catalog/models/announcement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() data!: IAnnouncement[];
  currencyIcon = faDollarSign;
  starIcon = faStar;
  locationIcon = faLocationArrow;

  constructor(
    private imageService: ImageService,
    private router: Router
  ){}

  ngOnInit(): void {}

  getAnnImage(item: IAnnouncement): string {
    if (item.imagePathList && item.imagePathList.length) {
      return this.imageService.getFullImagePath(item.imagePathList[0]);
    }
    return "../../../../../assets/images/no-image.png"
  }

  goToAnnouncement(item: IAnnouncement): void {
    this.router.navigate([`/announcement/view/${item.id}`])
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { IAnnouncement } from 'src/app/modules/catalog/models/announcement';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() data!: IAnnouncement[];
  currencyIcon = faDollarSign;
  starIcon = faStar;

  constructor(
    private imageService: ImageService,
  ){}

  ngOnInit(): void {}

  getUserImage(item: IAnnouncement): string {
    if (item.imagePathList && item.imagePathList.length) {
      return this.imageService.getFullImagePath(item.imagePathList[0]);
    }
    return "../../../../../assets/icons/default-icon.png"
  }
}

import { Component, OnInit } from '@angular/core';
import { IAnnouncement } from '../../models/announcement';
import { AnnouncementService } from '../../services/announcement.service';
import { DefaultAnnouncementService } from '../../services/announcement-init';
import { FilterService } from '../../services/filter.service';
import { IFilters } from '../../models/filters.interface';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  providers: [DefaultAnnouncementService],
})
export class AllComponent implements OnInit {
  announcements!: IAnnouncement[];
  filteredAnns!: IAnnouncement[];
  constructor(
    protected announcement: AnnouncementService,
    protected filters: FilterService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.getAnnouncements();

    this.subscribeToFilters();
  }

  getAnnouncements(keywords?: string, callback?: any): void {
    this.announcement.getAllOpenAnnouncements(keywords)
    .subscribe(
      (res) => { 
        this.announcements = res; 
        this.filteredAnns = _.cloneDeep(this.announcements);

        if (callback) {
          callback.call();
        }
      }
    )
  }



  subscribeToFilters(): void {
    this.filters.currentFilters.subscribe(
      (filters: IFilters) => {
        if (this.announcements) {

          this.getAnnouncements(
            filters.search as string | undefined, 
            () => this.filterData(filters)
          );
        }
      }
    )
  }

  filterData(filters: IFilters): void {
    this.filteredAnns = _.cloneDeep(this.announcements);

    if (filters.priceTo) {
      this.filteredAnns = this.announcements.filter((ann) => filters.priceTo && ann.price <= filters.priceTo)
    }
    if (filters.priceFrom) {
      this.filteredAnns = this.announcements.filter((ann) => filters.priceFrom && ann.price <= filters.priceFrom)
    }
    if (filters.city) {
      this.filteredAnns = this.announcements.filter((ann) => filters.city && 
      ann.property.house?.address.city.id === filters.city)
    }
    if (filters.rating) {
      this.filteredAnns = this.announcements.filter((ann) => filters.rating && 
        ann.property.owner.rating >= filters.rating)
    }
    if (filters.type) {
      this.filteredAnns = this.announcements.filter((ann) => filters.type && 
        ann.type === filters.type)
    }
  }

}

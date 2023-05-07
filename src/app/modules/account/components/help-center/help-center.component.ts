import { Component, OnInit } from '@angular/core';
import { IDxTabItem } from '../../models/dx-tabs-item.interface';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  selectedItem!: IDxTabItem | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.selectedItem = this.items[0];
    this.selectTab({ itemData: this.selectedItem });

    this.router.events.subscribe(() => {
      this.setActiveTab()
    })
  }

  setActiveTab(): void {
    this.selectedItem = _.find(this.items, (item) => {
      console.log(item, this.router.url)
      return this.router.url.includes(item.path)
    })
  }

  selectTab(e: any): void {
    this.router.navigate([`./${e.itemData.path}`], { relativeTo: this.route })
  }

  items: IDxTabItem[] = [
    {
      text: 'FAG',
      template: 'tab-item',
      path: 'faq',
    },
    {
      text: 'Contact us',
      template: 'tab-item',
      path: 'contact-us',
    },
  ]

}

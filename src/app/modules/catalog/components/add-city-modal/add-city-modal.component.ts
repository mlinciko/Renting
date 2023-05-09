import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/utils/ulits.class';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss']
})
export class AddCityModalComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: {regionId: number | null, name: string | null} = {regionId: null, name: null};

  constructor(
    private common: CommonService,
    private addAnnService: AddAnnouncementService,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems(): void {
    this.formItems = [  
      {
        editorType: 'dxSelectBox',
        dataField: 'regionId',
        label: { text: 'Region', visible: false },
        validationRules: [Utils.requiredRule()],
        editorOptions: {
          dataSource: this.common.createSelectSource("regions"),
          labelMode: 'floating',
          maxLength: 60,
          valueExpr: "id",
          displayExpr: "name",
        },
      }, 
      {
        colSpan: 2,
        editorType: 'dxTextBox',
        dataField: 'name',
        label: { text: 'Name', visible: false },
        editorOptions: {
          labelMode: 'floating',
          maxLength: 60,
        },
      },
    ]
  }

  add = (): void => {
    this.addAnnService.createCity(this.formData)
    .subscribe(() => this.cancel() )
  }

  cancel = (): void => {
    this.onCancel.emit();
    this.initFormItems();
  };
}

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/utils/ulits.class';
import { AddAnnouncementService } from '../../services/add-announcement.service';

@Component({
  selector: 'app-add-street-modal',
  templateUrl: './add-street-modal.component.html',
  styleUrls: ['./add-street-modal.component.scss']
})
export class AddStreetModalComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: {cityId: number | null, name: string | null} = {cityId: null, name: null};

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
        dataField: 'cityId',
        label: { text: 'City', visible: false },
        validationRules: [Utils.requiredRule()],
        editorOptions: {
          dataSource: this.common.createSelectSource("cities"),
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
    this.addAnnService.createStreet(this.formData)
    .subscribe(() => this.cancel() )
  }

  cancel = (): void => {
    this.onCancel.emit();
    this.initFormItems();
  };

}

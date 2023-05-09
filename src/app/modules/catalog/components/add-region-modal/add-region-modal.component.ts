import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { IDxFormItems } from 'src/app/models/models';
import { DxFormComponent } from 'devextreme-angular';
import { Utils } from 'src/app/utils/ulits.class';

@Component({
  selector: 'app-add-region-modal',
  templateUrl: './add-region-modal.component.html',
  styleUrls: ['./add-region-modal.component.scss'],
})
export class AddRegionModalComponent implements OnInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: {name: string} = {name: ""};

  constructor(
    private addAnnService: AddAnnouncementService,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems(): void {
    this.formItems = [   
      {
        colSpan: 2,
        editorType: 'dxTextBox',
        dataField: 'name',
        label: { text: 'Name', visible: false },
        editorOptions: {
          labelMode: 'floating',
          maxLength: 60,
        },
        validationRules: [Utils.requiredRule()],
      },
    ]
  }

  add = (): void => {
    if (this.form.instance.validate().isValid) {
      this.addAnnService.createRegion(this.formData)
      .subscribe(() => this.cancel())
    }
    
  }

  cancel = (): void => {
    this.onCancel.emit();
    this.initFormItems();
  };

}

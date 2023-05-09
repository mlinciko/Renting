import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { Utils } from 'src/app/utils/ulits.class';
import { AddAnnouncementService } from '../../services/add-announcement.service';

@Component({
  selector: 'app-add-house-material-modal',
  templateUrl: './add-house-material-modal.component.html',
  styleUrls: ['./add-house-material-modal.component.scss'],
})
export class AddHouseMaterialModalComponent implements OnInit {
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
      this.addAnnService.createMaterial(this.formData)
      .subscribe(() => this.cancel())
    }
    
  }

  cancel = (): void => {
    this.onCancel.emit();
    this.initFormItems();
  };

}

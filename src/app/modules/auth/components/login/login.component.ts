import { Component, OnInit, ViewChild } from '@angular/core';
import { IDxFormItems } from 'src/app/models/models';
import { Utils } from 'src/app/utils/ulits.class';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData = {};

  constructor() { }

  ngOnInit(): void {
    this.initFormItems()
  }

  initFormItems(): void {
    this.formItems = [
      {
        editorType: 'dxTextBox',
        dataField: 'email',
        label: { text: 'Email', visible: false },
        editorOptions: {
          labelMode: 'floating'
        },
        validationRules: [Utils.requiredRule()],
      }, 
      {
        editorType: 'dxTextBox',
        dataField: 'password',
        label: { text: 'Password', visible: false },
        editorOptions: {
          labelMode: 'floating',
          mode: 'password',  
        },
        validationRules: [Utils.requiredRule()],
      }
    ]
  }

  submitForm(): void {
    if (this.form.instance.validate().isValid){
      console.log(this.formData);
    } 
  }

}

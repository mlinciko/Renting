import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems, IUser } from 'src/app/models/models';
import { IUserEdit, initialUserEditData } from '../../models/user-edit.interface';
import { Utils } from 'src/app/utils/ulits.class';
import { UserService } from 'src/app/services/user.service';
import { faPen, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from 'src/app/services/image.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: IUserEdit | any = _.cloneDeep(initialUserEditData);
  user!: IUser;
  editIcon = faPen;
  noImageIcon = faUserCircle;

  avatarDialog: boolean = false;
  constructor(
    private userService: UserService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
    this.userService.user.subscribe(
      (user: IUser) => {
        this.formData = _.merge(this.formData, user);
        _.forEach(Object.keys(this.formData), 
          (key) => {
            if (!initialUserEditData.hasOwnProperty(key)) {
              delete this.formData[key]
            }
        })
        this.user = user;
      }
    )
  }

  initFormItems(): void {
    this.formItems = [
      {
        editorType: 'dxTextBox',
        dataField: 'email',
        label: { visible: false },
        editorOptions: {
          placeholder: 'Email'
        },
        validationRules: [Utils.requiredRule()],
      }, 
      {
        editorType: 'dxTextBox',
        dataField: 'firstName',
        label: { visible: false },
        editorOptions: {
          placeholder: 'First Name'
        },
        validationRules: [Utils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'lastName',
        label: { visible: false },
        editorOptions: {
          placeholder: 'Last Name'
        },
        validationRules: [Utils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'patronymic',
        label: { visible: false },
        editorOptions: {
          placeholder: 'Middle Name'
        },
        validationRules: [Utils.requiredRule()],
      },
      {
        editorType: 'dxTextBox',
        dataField: 'phoneNumber',
        label: { visible: false },
        editorOptions: {
          placeholder: 'Phone Number'
        },
        validationRules:[
          {
            type: "custom",
            reevaluate: false,
            message: "Invalid telephone number",
            validationCallback: (e: any): boolean => {
              if (e.value !== '') {
                const tel = e.value;
                if (tel.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/))
                  return true;
                else return false
              }
              return true;
            },
          },
          Utils.requiredRule()
        ]
      },
      {
        editorType: 'dxTextBox',
        dataField: 'username',
        label: { visible: false },
        editorOptions: {
          placeholder: 'Username'
        },
        validationRules: [Utils.requiredRule()],
      },
    ]
  }

  submitForm(): void {
    if (this.form.instance.validate().isValid){
      console.log(this.formData);
      this.userService.updateCurrentUser(this.formData)
      .subscribe(
        (res) => {
          console.log(res);
        }
      )
    } 
  }

  getUserImage(imagePath: string): string {
    return this.imageService.getFullImagePath(imagePath);
  }

  loadAvatar(): void {
    this.avatarDialog = true;
  }

  closeLoadAvatar(): void {
    this.avatarDialog = false;
  }

}

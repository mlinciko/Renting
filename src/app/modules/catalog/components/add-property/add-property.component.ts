import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/utils/ulits.class';
import { propertyType } from '../../models/property.type';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { UserService } from 'src/app/services/user.service';
import { IPropertyPayload } from '../../models/property-payload.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  @Input() set type(value: propertyType) {
    if (value) {
      this.propertyType = value;
      this.initPropertyFormItems();
    }
  }
  propertyType!: propertyType;
  @ViewChild('formProperty') formProperty!: DxFormComponent;
  propertyFormItems!: IDxFormItems;
  propertyFormData: any;

  houseMaterialModal: boolean = false;
  isFormDisaled: boolean = true;

  name: string = "property";

  constructor(
    private common: CommonService,
    private addAnnService: AddAnnouncementService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initPropertyFormItems();

    this.disableBehavior();
  }

  initPropertyFormItems(): void {
    this.propertyFormData = {};
    this.propertyFormItems = [
      {
        itemType: 'group',
        caption: 'Property',
        items: [
          {
            editorType: 'dxTextBox',
            colSpan: 2,
            dataField: 'apartmentNumber',
            label: { text: 'Apartment number', visible: false },
            visible: this.propertyType === "APARTMENT",
            editorOptions: {
              labelMode: 'floating',
              maxLength: 60,
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxNumberBox',
            colSpan: 2,
            dataField: 'area',
            label: { text: 'Area', visible: false },
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxNumberBox',
            colSpan: 2,
            dataField: 'floor',
            label: { text: 'Floor', visible: false },
            visible: this.propertyType === "APARTMENT",
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxNumberBox',
            colSpan: 2,
            dataField: 'numberOfRooms',
            label: { text: 'Number of rooms', visible: false },
            visible: this.propertyType === "APARTMENT" || this.propertyType === "FAMILY_HOUSE",
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'renovationTypeId',
            colSpan: 2,
            label: { text: 'Renovation type', visible: false },
            validationRules: [Utils.requiredRule()],
            visible: this.propertyType === "APARTMENT" || this.propertyType === "FAMILY_HOUSE",
            editorOptions: {
              dataSource: this.common.createSelectSource("renovation-types"),
              labelMode: 'floating',
              maxLength: 60,
              valueExpr: "id",
              displayExpr: "name",
            },
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Save property",
              type: "default",
              width: "150",
              onClick: (e: any) => {
                this.addProperty();
              }
            }
          },
        ]
      }
    ]
  }

  disableBehavior(): void {
    this.addAnnService.activeForm.subscribe(
      (name) => {
        if (name === this.name) {
          this.isFormDisaled = false;
        } else this.isFormDisaled = true;
      }
    )
  }

  addProperty(): void {
    if (this.formProperty.instance.validate().isValid) {
      let payload: IPropertyPayload = {} as IPropertyPayload;
      let endpoint = "";
      if (this.propertyType === "APARTMENT") {
        payload = {
          ...this.propertyFormData,
          houseId: this.addAnnService.houseId.value,
          userIdOfOwner: this.userService.user.value.id
        }

        endpoint = "housing/apartments"
      }

      if (this.propertyType === "FAMILY_HOUSE") {
        payload = {
          ...this.propertyFormData,
          houseId: this.addAnnService.houseId.value,
          userIdOfOwner: this.userService.user.value.id
        }

        endpoint = "housing/family-houses";
      }

      if (this.propertyType === "LAND") {
        payload = {
          ...this.propertyFormData,
          streetId: this.addAnnService.streetId.value,
          userIdOfOwner: this.userService.user.value.id
        }

        endpoint = "lands";
      }

      this.addAnnService.createProperty(payload, endpoint as any)
      .subscribe(
        (property) => {
          console.log(property);
          this.addAnnService.propertyId.next(property.id);
          this.addAnnService.activeForm.next("announcement");
        }
      )
    }
  }

}

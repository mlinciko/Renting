import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHouseComponent } from './family-house.component';

describe('FamilyHouseComponent', () => {
  let component: FamilyHouseComponent;
  let fixture: ComponentFixture<FamilyHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

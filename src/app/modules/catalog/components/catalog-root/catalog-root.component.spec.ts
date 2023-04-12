import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogRootComponent } from './catalog-root.component';

describe('CatalogRootComponent', () => {
  let component: CatalogRootComponent;
  let fixture: ComponentFixture<CatalogRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

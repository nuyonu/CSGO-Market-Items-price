import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStoredItemsComponent } from './all-stored-items.component';

describe('AllStoredItemsComponent', () => {
  let component: AllStoredItemsComponent;
  let fixture: ComponentFixture<AllStoredItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStoredItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStoredItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

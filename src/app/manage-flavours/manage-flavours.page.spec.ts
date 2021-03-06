import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageFlavoursPage } from './manage-flavours.page';

describe('ManageFlavoursPage', () => {
  let component: ManageFlavoursPage;
  let fixture: ComponentFixture<ManageFlavoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFlavoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageFlavoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

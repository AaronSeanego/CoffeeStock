import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFlavoursPage } from './edit-flavours.page';

describe('EditFlavoursPage', () => {
  let component: EditFlavoursPage;
  let fixture: ComponentFixture<EditFlavoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFlavoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFlavoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

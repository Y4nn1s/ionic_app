import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacionPersonalPage } from './informacion-personal.page';

describe('InformacionPersonalPage', () => {
  let component: InformacionPersonalPage;
  let fixture: ComponentFixture<InformacionPersonalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPersonalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

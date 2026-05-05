import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { InformacionPersonalPage } from './informacion-personal.page';

describe('InformacionPersonalPage', () => {
  let component: InformacionPersonalPage;
  let fixture: ComponentFixture<InformacionPersonalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPersonalPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

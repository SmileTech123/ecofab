import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrontaComponent } from './confronta.component';

describe('ConfrontaComponent', () => {
  let component: ConfrontaComponent;
  let fixture: ComponentFixture<ConfrontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrontaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfrontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

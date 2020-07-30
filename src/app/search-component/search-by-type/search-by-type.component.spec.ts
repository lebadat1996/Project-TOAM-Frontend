import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTypeComponent } from './search-by-type.component';

describe('SearchByTypeComponent', () => {
  let component: SearchByTypeComponent;
  let fixture: ComponentFixture<SearchByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

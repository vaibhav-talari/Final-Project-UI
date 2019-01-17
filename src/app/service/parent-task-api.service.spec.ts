import { TestBed, inject } from '@angular/core/testing';

import { ParentTaskAPIService } from './parent-task-api.service';

describe('ParentTaskAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentTaskAPIService]
    });
  });

  it('should be created', inject([ParentTaskAPIService], (service: ParentTaskAPIService) => {
    expect(service).toBeTruthy();
  }));
});

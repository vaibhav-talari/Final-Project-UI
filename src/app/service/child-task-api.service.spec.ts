import { TestBed, inject } from '@angular/core/testing';

import { ChildTaskAPIService } from './child-task-api.service';

describe('ChildTaskAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildTaskAPIService]
    });
  });

  it('should be created', inject([ChildTaskAPIService], (service: ChildTaskAPIService) => {
    expect(service).toBeTruthy();
  }));
});

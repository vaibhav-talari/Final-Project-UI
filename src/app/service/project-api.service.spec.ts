import { TestBed, inject } from '@angular/core/testing';

import { ProjectAPIService } from './project-api.service';

describe('ProjectAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectAPIService]
    });
  });

  it('should be created', inject([ProjectAPIService], (service: ProjectAPIService) => {
    expect(service).toBeTruthy();
  }));
});

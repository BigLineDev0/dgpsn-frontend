import { TestBed } from '@angular/core/testing';

import { WorkflowValidationHistoriqueServiceService } from './workflow-validation-historique-service.service';

describe('WorkflowValidationHistoriqueServiceService', () => {
  let service: WorkflowValidationHistoriqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowValidationHistoriqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

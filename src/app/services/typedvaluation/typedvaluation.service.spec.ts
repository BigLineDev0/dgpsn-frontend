import { TestBed } from '@angular/core/testing';
import { TypedvaluationService } from './typedvaluation.service';

 describe('TypedvaluationService', () => {
   let service: TypedvaluationService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(TypedvaluationService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


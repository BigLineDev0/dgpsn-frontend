import { TestBed } from '@angular/core/testing';
import { FormejuridiqueService } from './formejuridique.service';

 describe('FormejuridiqueService', () => {
   let service: FormejuridiqueService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(FormejuridiqueService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


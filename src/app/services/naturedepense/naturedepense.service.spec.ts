import { TestBed } from '@angular/core/testing';
import { NaturedepenseService } from './naturedepense.service';

 describe('NaturedepenseService', () => {
   let service: NaturedepenseService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(NaturedepenseService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


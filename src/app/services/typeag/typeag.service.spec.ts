import { TestBed } from '@angular/core/testing';
import { TypeagService } from './typeag.service';

 describe('TypeagService', () => {
   let service: TypeagService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(TypeagService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


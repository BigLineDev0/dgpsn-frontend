import { TestBed } from '@angular/core/testing';
import { ProcedurenominationService } from './procedurenomination.service';

 describe('ProcedurenominationService', () => {
   let service: ProcedurenominationService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(ProcedurenominationService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


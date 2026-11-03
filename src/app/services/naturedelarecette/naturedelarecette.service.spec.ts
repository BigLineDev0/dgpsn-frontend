import { TestBed } from '@angular/core/testing';
import { NaturedelarecetteService } from './naturedelarecette.service';

 describe('NaturedelarecetteService', () => {
   let service: NaturedelarecetteService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(NaturedelarecetteService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


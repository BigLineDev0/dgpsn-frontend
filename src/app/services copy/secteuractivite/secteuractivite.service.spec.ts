import { TestBed } from '@angular/core/testing';
import { SecteuractiviteService } from './secteuractivite.service';

 describe('SecteuractiviteService', () => {
   let service: SecteuractiviteService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(SecteuractiviteService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


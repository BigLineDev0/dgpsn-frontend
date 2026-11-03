import { TestBed } from '@angular/core/testing';
import { CategoriebudgetaireService } from './categoriebudgetaire.service';

 describe('CategoriebudgetaireService', () => {
   let service: CategoriebudgetaireService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(CategoriebudgetaireService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


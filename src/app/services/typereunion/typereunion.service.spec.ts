import { TestBed } from '@angular/core/testing';
import { TypereunionService } from './typereunion.service';

 describe('TypereunionService', () => {
   let service: TypereunionService;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     service = TestBed.inject(TypereunionService);
   });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
 });


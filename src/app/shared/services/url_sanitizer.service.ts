import { Injectable } from '@angular/core';
   import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

   @Injectable({
     providedIn: 'root'
   })
   export class UrlSanitizerService {
     constructor(private sanitizer: DomSanitizer) {}

    
   }
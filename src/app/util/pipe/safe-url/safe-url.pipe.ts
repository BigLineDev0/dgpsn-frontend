import { UrlSanitizerService } from '@/app/shared/services/url_sanitizer.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private urlSanitizerService: UrlSanitizerService) { }

  transform(url: any) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

}

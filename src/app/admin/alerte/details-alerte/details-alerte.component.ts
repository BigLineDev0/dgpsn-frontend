import { AlerteService } from '@/app/services/alerte/alerte.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-details-alerte',
  templateUrl: './details-alerte.component.html',
  styleUrls: ['./details-alerte.component.scss'],
  imports:[
    CommonModule
  ]
})
export class DetailsAlerteComponent implements OnInit, AfterViewInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('div') divRef!: ElementRef<HTMLDivElement>;

  @Input() alerte: any;

  constructor(private renderer: Renderer2, private alerteService: AlerteService) { }

  ngOnInit(): void {
    this.setAlertToRead();
  }

  ngAfterViewInit() {
    this.divRef.nativeElement.innerHTML = this.alerte.message;
  }

  close() {
    this.submit.emit(true);
  }

  getSeverity(name: any) {
    if (name === 'HAUTE') return 'badge bg-danger';
    else if(name === 'BASSE') return 'badge bg-primary';
    else return 'badge bg-warning'
  }

  setAlertToRead(){
    this.alerteService.setAlertToRead(this.alerte?.id).subscribe({
      next: value => {
      },
      error: err => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }


}

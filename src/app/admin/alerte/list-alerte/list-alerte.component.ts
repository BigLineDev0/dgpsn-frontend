import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlerteFormatterPipe } from '@/app/util/pipe/alerte/alerte-formatter.pipe';

@Component({
  selector: 'app-list-alerte',
  templateUrl: './list-alerte.component.html',
  styleUrls: ['./list-alerte.component.scss'],
  imports: [AlerteFormatterPipe,CommonModule]
})
export class ListAlerteComponent implements OnInit, AfterViewInit {

  @Output() click: EventEmitter<boolean> = new EventEmitter();

  @Input() alertes: any;

  @ViewChild('div') divRef!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    
  }

  viewDetails(event: any, alerte: any) {
    event.preventDefault();

    localStorage.setItem('details-alerte', JSON.stringify(alerte));

    this.clicked();
  }

  clicked(){
    this.click.emit(true);
  }

}

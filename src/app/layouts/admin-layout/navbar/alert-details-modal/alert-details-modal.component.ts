import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { Alert } from '../../../../admin/alerte/config-alerte/config-alerte.component';

@Component({
  selector: 'app-alert-details-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './alert-details-modal.component.html',
  styleUrls: ['./alert-details-modal.component.scss']
})
export class AlertDetailsModalComponent implements OnDestroy {
  @Input() alert!: Alert;
  @Output() close = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onClose(): void {
    this.close.emit();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.close.complete();
  }

  getPriorityClass(priorityName: string): string {
    switch (priorityName) {
      case 'HAUTE':
        return 'badge bg-danger';
      case 'MOYENNE':
        return 'badge bg-warning';
      case 'BASSE':
        return 'badge bg-success';
      default:
        return '';
    }
  }

}

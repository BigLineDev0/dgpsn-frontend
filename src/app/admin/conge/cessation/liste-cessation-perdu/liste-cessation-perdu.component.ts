
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CessationPerduService } from 'src/app/services/cessationPerdu/cessation-perdu.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-liste-cessation-perdu',
  templateUrl: './liste-cessation-perdu.component.html',
  styleUrls: ['./liste-cessation-perdu.component.scss']
})
export class ListeCessationPerduComponent implements OnInit, OnDestroy {
  pageOptions: any = {
    page: 0,
    size: 10
  };
  tableData: any;
  filteredData: any[] = [];
  originalData: any[] = [];
  displayedColumns = ['matricule', 'nom', 'prenom', 'nombreJourPerdu', 'date', 'annee' ,'action'];
  loadingIndicator = false;
  searchControl = new FormControl('');
  pageSizes: number[] = [2,4,10,20,30];
  private searchSubscription: Subscription;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  constructor(private cessationPerduService: CessationPerduService) {}

  ngOnInit(): void {
    this.setupSearch();
    this.getAllCessationPerdu();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  setupSearch(): void {
    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterData(searchTerm || '');
    });
  }

  onPageSizeChange(value: string){
    const newSize = parseInt(value, 10);
    this.pageOptions.size = newSize;
    this.pageOptions.page = 0;
    this.getAllCessationPerdu();
  }

  filterData(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase().trim();
    if (!searchTerm) {
      this.filteredData = [...this.originalData];
    } else {
      this.filteredData = this.originalData.filter(item => {
        return (
          (item?.conge?.agent?.matricule?.toLowerCase().includes(searchTerm)) ||
          (item?.conge?.agent?.nom?.toLowerCase().includes(searchTerm)) ||
          (item?.conge?.agent?.prenom?.toLowerCase().includes(searchTerm)) ||
          (item?.annee?.toString().includes(searchTerm))
        );
      });
    }

    this.pageOptions.page = 0;
    this.updateDisplayedData();
  }

  updateDisplayedData(): void {
    const start = this.pageOptions.page * this.pageOptions.size;
    const end = start + this.pageOptions.size;
    this.tableData = {
      payload: this.filteredData.slice(start, end),
      metadata: {
        totalElements: this.filteredData.length
      }
    };
  }

  getAllCessationPerdu() {
    this.loadingIndicator = true;
    this.cessationPerduService.readAllPerduCessation(this.pageOptions).subscribe({
      next: response => {
        this.tableData = response;
        this.originalData = response.payload;
        this.filteredData = [...this.originalData];
        this.updateDisplayedData();
        console.log('Données reçues:', this.tableData);
      },
      error: response => console.error(),
      complete: () => this.loadingIndicator = false
    });
  }

  close(): void {
    this.submit.emit(true);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.updateDisplayedData();
  }


  delete(cessationId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.cessationPerduService.delete(cessationId).subscribe({
          next: response => {
            Alertes.alerteDeleteSuccess()
          },
          error: response => console.log(response),
          complete: () => this.getAllCessationPerdu()
        })
      }
    );
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";
import {FinancementActivityService} from "@/app/services/financementActivity/financement-activity.service";
import {StructureService} from "@/app/services/structure/structure.service";
import {Alertes} from "@/app/util/alerte";
import {FinancementBudgetService} from "@/app/services/financement-budget.service";

@Component({
    selector: 'app-form-source-financement',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        NgOptionComponent,
        NgSelectComponent,
        ReactiveFormsModule,
        CurrencyPipe
    ],
    templateUrl: './form-source-financement.component.html',
    styleUrl: './form-source-financement.component.scss'
})
export class FormSourceFinancementComponent implements OnInit{
    form!: FormGroup;
    @Input() managementUnitId: any;
    @Input() tacheId: any;
    structure: any;
    budget: any;
    @Input() isSearch !: boolean;
    @Input() sourceToUpdate: any;
    @Input() label!: string;
    @Output() submit: EventEmitter<boolean> = new EventEmitter();

    ngOnInit(): void {
        this.initform();
        this.getStructure();
        this.getAllBudget()
    }

    constructor(private readonly fb: FormBuilder,
                private readonly financementService: FinancementActivityService,
                private readonly structureService: StructureService,
                private readonly budgetGlobalService: FinancementBudgetService) {
    }

    initform() {
        this.form = this.fb.group({
            montant: [null],
            structureId: [null],
            budgetGlobalId: [null],
            comment: [null],

        })
        this.loadFileds();
    }

    loadFileds() {
        if (this.sourceToUpdate !== undefined) {
            this.form.get('montant')?.setValue(this.sourceToUpdate.montant);
            this.form.get('structureId')?.setValue(this.sourceToUpdate?.structure?.id);
            this.form.get('budgetGlobalId')?.setValue(this.sourceToUpdate?.budgetGlobal?.id);
            this.form.get('comment')?.setValue(this.sourceToUpdate?.comment);

        }
    }

    save() {
        const source = this.form.value;
        if  (this.managementUnitId) {
            source.managementUnitId = +this.managementUnitId;
        }
        source.tacheId = this.tacheId;

        if (this.sourceToUpdate === undefined) {
            this.create(source)
        } else {
            this.update(this.sourceToUpdate.id, source)
        }
    }

    create(source: any) {
        this.financementService.createSource(source).subscribe({
            next: value => {
                Alertes.alerteAddSuccess('Enregistrement reussi');
            },
            error: value => {
                Alertes.alerteAddDanger(value.error.message)
            },
            complete: () => {
                this.close();
            }
        })
    }

    update(sourceId: any, sourceRequest: any) {
        this.financementService.updateSource(sourceId, sourceRequest).subscribe({
            next: value => {
                Alertes.alerteAddSuccess('Modification reussi');
            },
            error: value => {
                Alertes.alerteAddDanger(value.error.message)
            },
            complete: () => {
                this.close();
            }
        })
    }

    close() {
        this.submit.emit(true);
    }

    doSearch() {
    }

    getStructure(idsToIgnore?: any) {
        const req: any = {};
        if (idsToIgnore) {
            req.idsToIgnore = idsToIgnore
        }

        // req.structureTypeList = ["Partenaire"];
        // req.notOnly = true;
        req.sortBy = 'nom';
        req.ascending = true;
        req.page = 0;
        req.size = 10000;
        this.structureService.readStructures(req).subscribe(response => {
            this.structure = response.content;
            console.log();

        })
    }

    getAllBudget(){
        let pageOptions = { page: 0, size: 100};
        this.budgetGlobalService.readAllBudgetDgpsn(pageOptions).subscribe({
            next: response => {
                this.budget = response.content;
            },
            error: err => {
            },
            complete: () => {
            }
        });
    }

}

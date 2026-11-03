import { Component } from '@angular/core';
import { ListBudgetComponent } from '../list-budget/list-budget.component';

@Component({
  selector: 'app-main-budget',
  imports: [ListBudgetComponent],
  templateUrl: './main-budget.component.html',
  styleUrl: './main-budget.component.scss'
})
export class MainBudgetComponent {

}

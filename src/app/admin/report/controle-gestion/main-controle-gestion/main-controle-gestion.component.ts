import { Component } from "@angular/core";
import { ControleBudgetComponent } from "../controle-budget/controle-budget.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from "@angular/common";
import { ControleMarcherComponent } from "../controle-marcher/controle-marcher.component";

@Component({
  selector: "app-main-controle-gestion",
  imports: [
    ControleBudgetComponent,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    ControleMarcherComponent
  ],
  templateUrl: "./main-controle-gestion.component.html",
  styleUrl: "./main-controle-gestion.component.scss",
})
export class MainControleGestionComponent {
  selectedTabIndex = 0;

  tabs = [
    {
      label: "Controle budgetaire",
      icon: "account_balance",
      component: "budget",
    }
  ];

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    console.log("Tab changed to:", this.tabs[index].label);
  }
}

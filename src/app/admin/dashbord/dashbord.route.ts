import { Routes } from "@angular/router";
import { AgentDashbordComponent } from "./agent-dashbord/agent-dashbord.component";
import { MainDashbordComponent } from "./main-dashbord/main-dashbord.component";
import { BudgetDashbordComponent } from "./budget-dashbord/budget-dashbord.component";

export const DASHBORD_ROUTES: Routes = [
  {
    path: "dashbord",
    component: MainDashbordComponent,
    children: [
      {path: "agent", component: AgentDashbordComponent,},
      {path: "budget", component: BudgetDashbordComponent,},
    ],
  },
];

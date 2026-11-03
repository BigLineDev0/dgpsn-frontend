
import { Routes } from "@angular/router";
import {MainReportComponent} from "@/app/admin/report/main-report/main-report.component";
import {FinancialReportComponent} from "@/app/admin/report/financial-report/financial-report.component";
import {AdministrativeReportComponent} from "@/app/admin/report/administrative-report/administrative-report.component";
import {PlanningReportComponent} from "@/app/admin/report/planning-report/planning-report.component";
import {
    ManagementControlReportComponent
} from "@/app/admin/report/management-control-report/management-control-report.component";
import { MainControleGestionComponent } from "./controle-gestion/main-controle-gestion/main-controle-gestion.component";

export const REPORT_ROUTES: Routes = [
    {path: 'report', component: MainReportComponent},
    {path: 'report/financial-report', component: FinancialReportComponent},
    {path: 'report/administrative-report', component: AdministrativeReportComponent},
    {path: 'report/planning-report', component: PlanningReportComponent},
    {path: 'report/management-control-report', component: ManagementControlReportComponent},
    {path: 'report/controle-gestion', component: MainControleGestionComponent},
];

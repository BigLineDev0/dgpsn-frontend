import { Routes } from "@angular/router";
import { ConfigWorkFlowComponent } from "./config-work-flow/config-work-flow.component";

export const WORK_FLOW_ROUTES: Routes = [

{path: "work-flow", component:ConfigWorkFlowComponent,
    data: { title: "work-flow" }
}

];

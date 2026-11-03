import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  constructor(protected http: HttpClient) { }

  // create Workflow
  createWorkflow(workflow: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}workflows`, workflow);
  }

  // update a Workflow 
  updateWorkflow(workflowId: any, workflow: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}workflows/${workflowId}`, workflow, {
      observe: 'response',
    });
  }

  // get a Workflow
  readWorkflow(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}workflows/${id}`, {
      observe: 'response',
    });
  }

  //read all Workflow
  readWorkflows(workflow: { [key:string]: string} | null, page: any, size: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (workflow !== null) {
      Object.entries(workflow).forEach(([key, value]) => {
        if (value !== undefined) {
          params = params.set(key, value); 
        }
      });
    }

    return this.http.get<any>(`${environment.baseUrl}workflows`, { params: params });

  }

  //delete a Workflow
  deleteWorkflow(workflowId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}workflows/${workflowId}`, {
      observe: 'response',
    });
  }

  //===========================[WORKFLOW STEP]======================================
    // create WorkflowStep
  createWorkflowStep(workflowStep: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}workflow-steps`, workflowStep);
  }

  // update a Workflow 1
  updateWorkflowStep(workflowStepId: any, workflowStep: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}workflow-steps/${workflowStepId}`, workflowStep, {
      observe: 'response',
    });
  }

  // get a WorkflowStep
  readWorkflowStep(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}workflow-steps/${id}`, {
      observe: 'response',
    });
  }

  //read all WorkflowStep
  readWorkflowSteps(workflowStep: { [key:string]: string} | null, page: any, size: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (workflowStep !== null) {
      Object.entries(workflowStep).forEach(([key, value]) => {
        if (value !== undefined) {
          params = params.set(key, value); 
        }
      });
    }

    return this.http.get<any>(`${environment.baseUrl}workflow-steps`, { params: params });

  }

  //delete a WorkflowStep
  deleteWorkflowSteps(workflowStepId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}workflow-steps/${workflowStepId}`, {
      observe: 'response',
    });
  }

  //===========================[WORKFLOW STEP VALIDATION]======================================
    // create WorkflowStepValidation
  createWorkflowStepValidation(workflowStepValidation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}workflow-step-validations`, workflowStepValidation);
  }

  // update a Workflow 1
  updateWorkflowStepValidation(workflowStepValidationId: any, workflowStepValidation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}workflow-step-validations/${workflowStepValidationId}`, workflowStepValidation, {
      observe: 'response',
    });
  }

  // get a WorkflowStepValidation
  readWorkflowStepValidation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}workflow-step-validations/${id}`, {
      observe: 'response',
    });
  }

  //read all WorkflowStepValidation
  readWorkflowStepValidations(workflowStepValidation: { [key:string]: string} | null, page: any, size: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (workflowStepValidation !== null) {
      Object.entries(workflowStepValidation).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    return this.http.get<any>(`${environment.baseUrl}workflow-step-validations`, { params: params });
  }

  //read all WorkflowStepValidation
  readWorkflowUserConfig(workflowStepId: number, profileId?: number): Observable<any> {
    let params = new HttpParams().set('workflowStepId', workflowStepId);

    if (profileId !== undefined) {
       params = params.set('profileId', profileId)
    }

    return this.http.get<any>(`${environment.baseUrl}workflow-step-validations/config-user`, { params: params });
  }

  //delete a WorkflowStepValidation
  deleteWorkflowStepValidation(workflowStepValidationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}workflow-step-validations/${workflowStepValidationId}`, {
      observe: 'response',
    });
  }
}

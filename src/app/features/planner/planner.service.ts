import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskPlan } from './planner.model';

@Injectable({ providedIn: 'root' })
export class PlannerService
{
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8000/api/v1/planner';

  generatePlan(goal: string): Observable<TaskPlan>
  {
    return this.http.post<TaskPlan>(
      `${ this.apiUrl }/generate`,
      { goal }
    );
  }
}

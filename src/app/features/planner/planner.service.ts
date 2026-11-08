import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AITask } from './planner.model';

@Injectable({ providedIn: 'root' })
export class PlannerService
{
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8000/api/v1/tasks';

  createTask(goal: string): Observable<AITask>
  {
    return this.http.post<AITask>(
      this.apiUrl,
      { goal }
    );
  }

  getTasks(): Observable<AITask[]>
  {
    return this.http.get<AITask[]>(this.apiUrl);
  }

  getTask(id: string): Observable<AITask>
  {
    return this.http.get<AITask>(
      `${ this.apiUrl }/${ id }`
    );
  }
}

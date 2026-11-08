
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ResearchResponse } from './research.model';

@Injectable({ providedIn: 'root' })
export class ResearchService
{
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8000/api/v1/research';

  research(query: string): Observable<ResearchResponse>
  {
    return this.http.post<ResearchResponse>(
      this.apiUrl,
      { query }
    );
  }
}

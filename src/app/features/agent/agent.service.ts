
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface ToolExecution
{
  tool: string;
  arguments: Record<string, unknown>;
  result: unknown;
}

export interface AgentResponse
{
  answer: string;
  steps: ToolExecution[];
  iterations: number;
}

@Injectable({ providedIn: 'root' })
export class AgentService
{
  private readonly http = inject(HttpClient);

  run(message: string)
  {
    return this.http.post<AgentResponse>(
      'http://localhost:8000/api/v1/agent/run',
      { message }
    );
  }
}

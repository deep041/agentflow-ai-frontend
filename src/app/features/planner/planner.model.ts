export interface PlanStep
{
  title: string;
  description: string;
  agent: 'researcher' | 'analyst' | 'writer';
  estimated_minutes: number;
}

export interface TaskPlan
{
  title: string;
  summary: string;
  steps: PlanStep[];
}

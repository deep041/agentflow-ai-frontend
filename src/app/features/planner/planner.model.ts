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

export interface AITask
{
    id: string;
    goal: string;
    status: string;
    plan: TaskPlan;
    model: string;
    input_tokens: number;
    output_tokens: number;
    latency_ms: number;
    created_at: string;
}

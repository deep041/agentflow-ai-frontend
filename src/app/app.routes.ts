import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/planner/planner.component').then(m => m.PlannerComponent)
    },
    {
        path: 'research',
        loadComponent: () => import('./features/research/research.component').then(m => m.ResearchComponent),
    },
    {
        path: 'agent',
        loadComponent: () => import('./features/agent/agent.component').then(m => m.AgentComponent)
    }
];

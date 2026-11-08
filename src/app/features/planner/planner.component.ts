import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AITask } from './planner.model';
import { PlannerService } from './planner.service';

@Component({
    selector: 'app-planner',
    imports: [FormsModule],
    templateUrl: './planner.component.html',
    styleUrl: './planner.component.scss'
})

export class PlannerComponent
{

    private readonly plannerService = inject(PlannerService);

    goal = '';
    loading = signal(false);
    historyLoading = signal(false);
    error = signal('');

    selectedTask = signal<AITask | null>(null);
    tasks = signal<AITask[]>([]);

    ngOnInit(): void
    {
        this.loadHistory();
    }

    loadHistory(): void
    {
        this.historyLoading.set(true);

        this.plannerService.getTasks()
            .pipe(finalize(() => this.historyLoading.set(false)))
            .subscribe({
                next: tasks => this.tasks.set(tasks),
                error: () => this.error.set(
                    'Unable to load task history.'
                ),
            });
    }

    generatePlan(): void
    {
        const goal = this.goal.trim();

        if (goal.length < 10 || this.loading()) return;

        this.loading.set(true);
        this.error.set('');

        this.plannerService.createTask(goal)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: task =>
                {
                    this.selectedTask.set(task);
                    this.tasks.update(tasks => [task, ...tasks].slice(0, 50));
                },
                error: () => this.error.set(
                    'Unable to generate your plan.'
                ),
            });
    }

    openTask(task: AITask): void
    {
        this.selectedTask.set(task);
    }
}

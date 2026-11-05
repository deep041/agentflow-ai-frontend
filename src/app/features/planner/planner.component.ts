import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { TaskPlan } from './planner.model';
import { PlannerService } from './planner.service';

@Component({
  selector: 'app-planner',
  imports: [FormsModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})

export class PlannerComponent {

  private readonly plannerService = inject(PlannerService);

  goal = '';
  loading = signal(false);
  plan = signal<TaskPlan | null>(null);
  error = signal('');

  generatePlan(): void
  {
    const goal = this.goal.trim();

    if (goal.length < 10 || this.loading()) return;

    this.loading.set(true);
    this.plan.set(null);
    this.error.set('');

    this.plannerService.generatePlan(goal)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: result => this.plan.set(result),
        error: () => this.error.set(
          'Unable to generate the plan. Please try again.'
        )
      });
  }
}

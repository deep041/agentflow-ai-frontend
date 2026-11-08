import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AgentResponse, AgentService } from './agent.service';

@Component({
    selector: 'app-agent',
    imports: [FormsModule, JsonPipe],
    templateUrl: './agent.component.html',
    styleUrl: './agent.component.scss'
})

export class AgentComponent
{

    private readonly agentService = inject(AgentService);

    message = '';

    loading = signal(false);
    error = signal('');
    result = signal<AgentResponse | null>(null);

    execute()
    {
        if (this.loading() || this.message.trim().length < 3)
        {
            return;
        }

        this.loading.set(true);
        this.error.set('');
        this.result.set(null);

        this.agentService.run(this.message.trim())
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: response => this.result.set(response),
                error: () => this.error.set('Agent execution failed'),
            });
    }
}

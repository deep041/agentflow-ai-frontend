import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ResearchResponse } from './research.model';
import { ResearchService } from './research.service';

@Component({
    selector: 'app-research',
    imports: [FormsModule],
    templateUrl: './research.component.html',
    styleUrl: './research.component.scss'
})

export class ResearchComponent
{

    private readonly researchService = inject(ResearchService);

    query = '';

    loading = signal(false);
    error = signal('');
    result = signal<ResearchResponse | null>(null);

    startResearch(): void
    {
        const query = this.query.trim();

        if (query.length < 10 || this.loading())
        {
            return;
        }

        this.loading.set(true);
        this.error.set('');
        this.result.set(null);

        this.researchService.research(query)
            .pipe(
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: response =>
                {
                    this.result.set(response);
                },
                error: () =>
                {
                    this.error.set(
                        'Research failed. Please try again.'
                    );
                },
            });
    }
}

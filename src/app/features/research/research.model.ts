
export interface ResearchSource
{
  title: string;
  url: string;
}

export interface ResearchResponse
{
  query: string;
  report: string;
  sources: ResearchSource[];
  model: string;
  input_tokens: number;
  output_tokens: number;
  latency_ms: number;
}

import { Threat } from './threat';
export interface HardwareThreat {
  name: string;
  version: string;
  affected: string[];
  overview: string;
  description: string;
  impact: string[];
  solution: string[];
  reference: string[];
  model: string;
  disclaimer: string;
}

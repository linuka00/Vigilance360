import { Threat } from './threat';
export interface SoftwareThreat {
  name: string;
  version: string;
  affected: string[];
  overview: string;
  description: string;
  impact: string[];
  solution: string[];
  reference: string[];
  publisher: string;
  disclaimer: string;
}

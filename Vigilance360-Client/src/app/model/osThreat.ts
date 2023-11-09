import { Device } from './device';
import { Threat } from './threat';
export interface OsThreat {
  name: string;
  version: string;
  affected: string[];
  overview: string;
  description: string;
  impact: string[];
  solution: string[];
  reference: string[];
  disclaimer: string;
}

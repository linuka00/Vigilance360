import { Device } from './device';
export interface Threat {
  id: string;
  user_id: string;
  name: string;
  affected: string;
  overview: string;
  description: string;
  impact: string;
  solution: string;
  reference: string;
  disclaimer: string;
  platform: string;
  version: string;
  platform_value: any;
  device: Device;
  status: number;
  threatLevel: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Threat } from '../model/threat';
import { SoftwareThreat } from '../model/softwareThreat';
import { OsThreat } from '../model/osThreat';
import { HardwareThreat } from '../model/hardwareThreat';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}

  sendRequestToServer(userId: string) {
    return this.http.post('http://127.0.0.1:8000/trigger', {
      userId: userId,
    });
  }

  getToken(user: any) {
    return this.http.post('http://127.0.0.1:8000/generate_token', {
      email: user.email,
      id: user.id,
      email_verified: user.email_verified,
    });
  }

  addSoftwareThreat(threat: SoftwareThreat) {
    return this.http.post('http://127.0.0.1:8000/addHardwareThreat', {
      name: threat.name,
      version: threat.version,
      publisher: threat.publisher,
      affected: threat.affected,
      overview: threat.overview,
      description: threat.description,
      impact: threat.impact,
      solution: threat.solution,
      reference: threat.reference,
    });
  }

  addOsThreat(threat: OsThreat) {
    return this.http.post('http://127.0.0.1:8000/addOsThreat', {
      name: threat.name,
      version: threat.version,
      affected: threat.affected,
      overview: threat.overview,
      description: threat.description,
      impact: threat.impact,
      solution: threat.solution,
      reference: threat.reference,
    });
  }

  addHardwareThreat(threat: HardwareThreat) {
    return this.http.post('http://127.0.0.1:8000/addHardwareThreat', {
      name: threat.name,
      version: threat.version,
      model: threat.model,
      affected: threat.affected,
      overview: threat.overview,
      description: threat.description,
      impact: threat.impact,
      solution: threat.solution,
      reference: threat.reference,
    });
  }
}

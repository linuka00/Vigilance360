import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Threat } from '../model/threat';

@Injectable({
  providedIn: 'root',
})
export class ThreatService {
  threatRef: AngularFireList<Threat>;
  
  constructor(private db: AngularFireDatabase) {
    //set the reference to the database path
    this.threatRef = db.list('/threat');
  }

  //create
  createThreat(threat: Threat) {
    const keyRef = this.threatRef.push(threat);
    const keyValue = keyRef.key as string;
    threat.id = keyValue;
    this.updateThreat(keyValue, threat);
  }

  //read
  getThreat(user_id:string) {
    return this.db.list<Threat>('/threat', (ref) => ref.orderByChild('user_id').equalTo(user_id));
    // return this.threatRef;

  }

  //update
  updateThreat(key: string, newData: Threat) {
    this.threatRef.update(key, newData);
  }

  //delete
  deleteThreat(key: string) {
    this.threatRef.remove(key);
  }
}

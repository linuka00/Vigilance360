import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Device } from '../model/device';
import { Software } from '../model/software';
import { Hardware } from '../model/hardware';
import { Os } from '../model/os';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {}

  addDevice(device: Device) {
    return this.db.list('device/').push(device);
  }

  getAllDevice(user_id: string) {
    return this.db.list('/device', (ref) =>
      ref.orderByChild('u_id').equalTo(user_id)
    );
  }

  removeDevice(device_id: string) {
    return this.db.list('/device').remove(device_id);
  }

  updateDevice(device_id: string, device: Device) {
    return this.db.list('/device').update(device_id, device);
  }

  addSoftware(software: Software) {
    return this.db.list('software/').push(software);
  }

  getAllSoftware(user_id: string) {
    return this.db.list('/software', (ref) =>
      ref.orderByChild('u_id').equalTo(user_id)
    );
  }

  removeSoftware(software_id: string) {
    return this.db.list('/software').remove(software_id);
  }

  updateSoftware(software_id: string, software: Software) {
    return this.db.list('/software').update(software_id, software);
  }

  addHardware(hardware: Hardware) {
    return this.db.list('hardware/').push(hardware);
  }

  getAllHardware(user_id: string) {
    return this.db.list('/hardware', (ref) =>
      ref.orderByChild('u_id').equalTo(user_id)
    );
  }

  removeHardware(hardware_id: string) {
    return this.db.list('/hardware').remove(hardware_id);
  }

  updateHardware(hardware_id: string, hardware: Hardware) {
    return this.db.list('/hardware').update(hardware_id, hardware);
  }

  addOs(os: Os) {
    return this.db.list('/os').push(os);
  }

  getAllOs(user_id: string) {
    return this.db.list('/os', (ref) =>
      ref.orderByChild('u_id').equalTo(user_id)
    );
  }

  removeOs(os_id: string) {
    return this.db.list('/os').remove(os_id);
  }

  removeOsByDeviceId(device_id: string) {
    return this.db
      .list('/os', (ref) => ref.orderByChild('d_id').equalTo(device_id))
      .snapshotChanges()
      .subscribe((snapshot) => {
        snapshot.forEach((value) => {
          this.removeOs(value.key!);
        });
      });
  }

  removeSoftwareByDeviceId(device_id: string) {
    return this.db
      .list('/software', (ref) => ref.orderByChild('d_id').equalTo(device_id))
      .snapshotChanges()
      .subscribe((snapshot) => {
        snapshot.forEach((value) => {
          this.removeSoftware(value.key!);
        });
      });
  }

  removeHardwareByDeviceId(device_id: string) {
    return this.db
      .list('/hardware', (ref) => ref.orderByChild('d_id').equalTo(device_id))
      .snapshotChanges()
      .subscribe((snapshot) => {
        snapshot.forEach((value) => {
          this.removeHardware(value.key!);
        });
      });
  }

  updateOs(os_id: string, os: Os) {
    return this.db.list('/os').update(os_id, os);
  }
}

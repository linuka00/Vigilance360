import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private fire: AngularFirestore) {}

  getAllUrl() {
    const urlRef = this.fire.collection('urls');
    return urlRef.snapshotChanges();
  }

  addUrl(url: string) {
    return this.fire.collection('urls').add({ url: url });
  }

  deleteUrl(id: string) {
    return this.fire.doc(`urls/${id}`).delete();
  }

  updateUrl(id: string, url: string) {
    return this.fire.doc(`urls/${id}`).update({ url: url });
  }
}

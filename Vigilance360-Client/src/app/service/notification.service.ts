import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Request } from '../model/request';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private fire: AngularFirestore) {}

  addRequest(request: Request) {
    // return this.fire.collection('request').add(request);
    return this.fire
      .collection('request', (ref) => ref.where('sendId', '==', request.sendId))
      .get()
      .pipe(
        map((querySnapshot) => {
          if (querySnapshot.empty) {
            // No existing request found, add the new request
            return this.fire.collection('request').add(request);
          } else {
            // Existing request found, handle it as needed
            // You can return an error or take other actions
            throw new Error('Request already exists');
          }
        })
      );
  }

  deleteRequest(userId: string) {
    // return this.fire.doc(`urls/${id}`).delete();
    // Query the Firestore collection to find documents with the specified user ID
    this.fire
      .collection('request', (ref) => ref.where('sendId', '==', userId))
      .get()
      .subscribe((querySnapshot) => {
        // Delete each matching document
        querySnapshot.forEach((doc) => {
          this.fire.collection('request').doc(doc.id).delete();
        });
      });
  }

  updateRequest(userId: string) {
    // return this.fire.doc(`urls/${id}`).update({ url: url });
    this.fire
      .collection('request', (ref) => ref.where('sendId', '==', userId))
      .get()
      .subscribe((querySnapshot) => {
        // Step 2: Update matching requests with new data
        querySnapshot.forEach((doc) => {
          const requestId = doc.id;
          this.fire
            .collection('request')
            .doc(requestId)
            .update({ isAccept: true });
        });
      });
  }

  getReceivedRequest(userId: string) {
    return this.fire
      .collection('request', (ref) => ref.where('receivedId', '==', userId))
      .valueChanges();
  }

  getSendRequest(userId: string) {
    return this.fire
      .collection('request', (ref) => ref.where('sendId', '==', userId))
      .valueChanges();
  }
}

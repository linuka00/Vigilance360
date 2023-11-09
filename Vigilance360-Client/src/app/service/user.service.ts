import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fireStore: AngularFirestore) {}

  // add user
  addUser(user: User) {
    user.id = this.fireStore.createId();
    return this.fireStore.collection('/test').add(user);
  }

  //get all user
  getAllUser() {
    return this.fireStore.collection('/test').snapshotChanges();
  }

  //delete student
  deleteUser(user: User) {
    return this.fireStore.doc('/test/' + user.id).delete();
  }

  //update user
  updateUser(user: User) {
    this.deleteUser(user);
    this.addUser(user);
  }
}

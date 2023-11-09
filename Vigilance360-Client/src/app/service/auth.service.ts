import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private jwtHelper: JwtHelperService,
    private firestore: AngularFirestore
  ) {}

  //is analysis
  isAnalysis(): boolean {
    if (!this.isLoggedIn()) return false;
    return this.currentUser.email_verified;
  }

  // is log in
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        let isExpired = this.jwtHelper.isTokenExpired(token);
        return !isExpired;
      } catch {
        return false;
      }
    }
    return false;
  }

  //get current user
  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    // return this.jwtHelper.decodeToken(token);
    let deToken = this.jwtHelper.decodeToken(token);
    return deToken;
  }

  //login method
  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  //register method
  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password);
  }

  //sing out
  logout() {
    return this.fireauth.signOut();
  }

  //forgot password
  forgotPassword(email: string) {
    return this.fireauth.sendPasswordResetEmail(email);
  }

  // email varificatioin
  sendEmailForVarification(user: any) {
    return user.sendEmailVerification();
  }

  //save user in firestore
  saveUser(user: any) {
    const appUser: any = {
      email: user.email,
      id: user.id,
      orgId: user.orgId,
      email_verified: user.email_verified,
    };
    return this.firestore.collection('user').add(user);
  }

  getUser(id: any) {
    const userRef = this.firestore.collection('user').ref.where('id', '==', id);
    return userRef.get();
  }

  getAllOrgs() {
    const userRef = this.firestore
      .collection('user')
      .ref.where('email_verified', '==', true);
    return userRef.get();
  }

  updateUsesr(id: any, email_verified: boolean) {
    const userRef = this.firestore.collection('user').ref.where('id', '==', id);
    return userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('user').doc(doc.id).update({
            email_verified: email_verified,
          });
        });
      })
      .catch((err) => {
        return 'error';
      });
  }

  joinOrg(id: any, orgId: string) {
    const userRef = this.firestore.collection('user').ref.where('id', '==', id);
    return userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('user').doc(doc.id).update({
            orgId: orgId,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

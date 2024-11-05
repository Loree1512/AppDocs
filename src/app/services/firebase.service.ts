import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth:AngularFireAuth,private router:Router,private firestore:AngularFirestore) { }

  login(correo:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(correo,password);
  }
  logout(){
    return this.afAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }

  async create_user(correo:string,password:string,nombre:string){
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo,password);
    const uid = userCredential.user?.uid;

    await this.firestore.doc(`users/${uid}`).set({
      correo:correo,
      nombre:nombre,
      uid:uid
    });
    return userCredential;
  }
}
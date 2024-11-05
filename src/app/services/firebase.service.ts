import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  // Función para iniciar sesión
  login(correo: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(correo, password);
  }

  // Función para cerrar sesión
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Función para crear un nuevo usuario
  async create_user(correo: string, password: string, nombre: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo, password);
    const user = userCredential.user;

    if (user) {
      await this.updateUserData(user.uid, correo, nombre);
    }

    return userCredential;
  }

  // Función para actualizar los datos del usuario en Firestore
  private async updateUserData(uid: string, correo: string, nombre: string) {
    const userRef = this.firestore.doc(`users/${uid}`);

    const data = {
      uid: uid,
      correo: correo,
      nombre: nombre,
      lastLogin: new Date() 
    };

    await userRef.set(data, { merge: true });
  }

  // Función para obtener los datos del usuario
  async getUserData(uid: string) {
    try {
      const docRef = this.firestore.doc(`users/${uid}`);
      const doc = await firstValueFrom(docRef.get());
      return doc?.data();
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  }
}
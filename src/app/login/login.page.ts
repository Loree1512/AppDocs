import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from '../services/firebase.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user.model';
//librerías de cámara
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = "";
  correo: string = "";
  password: string = "";

  constructor(
    public mensaje: ToastController,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private loginFirebase: FirebaseLoginService
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  async mensajeError() {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: 'El inicio de sesión falló, por favor intente de nuevo',
      buttons: ['OK']
    });

    await alert.present();
  }

  async mensajeExito(nombre: string) {
    const toast = await this.mensaje.create({
      message: `Inicio de sesión exitoso, bienvenido ${nombre}`,
      duration: 2000
    });
    toast.present();
  }

  async ingresar() {
    if (this.correo === "" && this.password === "") {
      console.log("No pueden estar los campos vacíos");
      this.mensajeError();
    } else {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, this.correo, this.password);
        const user = userCredential.user;
        await this.storage.set("correo", this.correo);
        await this.storage.set("SessionID", true);
        console.log("Inicio exitoso");
        this.mensajeExito(user.email || 'Usuario');
        this.router.navigate(["/home"]);
      } catch (error) {
        this.mensajeError();
      }
    }
  }
}
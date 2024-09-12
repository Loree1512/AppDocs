import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  loginData = {
    nombre: '',
    password: ''
  };

constructor(public mensaje:ToastController, private route:Router, private alertController: AlertController) {}


async mensajeError(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
}

async mensajeExito(nombre: string){
  const toast = await this.mensaje.create({
    message: `Inicio de sesión exitoso, bienvenido ${nombre}`,
    duration: 2000
  });
  toast.present();
}

  ingresar() {

    if (!this.loginData.nombre || !this.loginData.password) {
      this.mensajeError('No puede dejar campos vacíos');
      return;
    }

    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const user = JSON.parse(savedUser);

      // Verifica si el usuario y la contraseña coinciden
      if (user.nombre === this.loginData.nombre && user.password === this.loginData.password) {
        console.log('Login exitoso');
        this.mensajeExito(user.nombre)
        this.route.navigate(['./home']);  // Redirige al home si el login es exitoso
      } else {
        console.log('Credenciales incorrectas');
        this.mensajeError('Nombre de usuario o contraseña incorrectos');
      }
    } else {
      console.log('No se encontró el usuario');
      this.mensajeError('No hay un usuario registrado.');
    }
  }


}
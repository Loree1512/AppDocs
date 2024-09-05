import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string =""
  correo: string =""
  password: string =""

  constructor(public mensaje:ToastController, private route:Router, public alerta:AlertController ) { }

  async mensajeExito(){
    const toast = await this.mensaje.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  async mensajeError(){
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Error en el inicio de sesión',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['Aceptar']
    });
  }

  ingresar(){
    if(this.correo == "admin" && this.password == "admin"){
      this.mensajeExito();
      this.route.navigate(['/home']);
    }else{
      this.mensajeError();
    }
  }

  ngOnInit() {
  }

}

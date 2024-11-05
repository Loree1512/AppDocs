import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseLoginService } from '../../services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
    nombre: string="";
    correo: string="";
    password: string="";

  constructor(private alertController: AlertController, private router: Router, private access:FirebaseLoginService) { }

  ngOnInit() {
  }
  async crear_usuario(){
    await this.access.create_user(this.correo,this.password,this.nombre)

  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }






}

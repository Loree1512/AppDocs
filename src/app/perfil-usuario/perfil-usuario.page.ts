import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  nombre: string = '';
  correo: string = '';

  constructor(private alertController: AlertController, 
              private router: Router, 
              private storage: Storage,
              private firebaseService: FirebaseLoginService) {}


  async ngOnInit() {
    await this.storage.create(); 
    const isLoggedIn = await this.storage.get("SessionID");
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.nombre = await this.storage.get("nombre") || '';
    this.correo = await this.storage.get("correo") || '';
  }


  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      message: 'Esta funcionalidad aún no está implementada.',
      buttons: ['OK']
    });

    await alert.present();
  }

}

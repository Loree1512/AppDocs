import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
 
  constructor(private alertController: AlertController, private router: Router, private storage: Storage) { }

  username: string = '';
  usermail: string = '';
  userdate: string = '';

  async ngOnInit() {
    await this.storage.create(); 
    const isLoggedIn = await this.storage.get("SessionID");
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
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

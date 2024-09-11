import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  user = {
    name: 'Rene Puente',
    email: 'rene.puente@ejemplo.com',
    location: 'Santiago, Chile',
    joinDate: '10 de Septiembre, 2024',
    avatar: 'src\assets\avatar.jpg' // URL de ejemplo
  };

  constructor(private alertController: AlertController) { }

  ngOnInit() {
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

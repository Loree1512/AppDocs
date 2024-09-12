import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
 
  constructor(private alertController: AlertController, private router: Router) { }

  username: string = '';
  usermail: string = '';
  userdate: string = '';

  ngOnInit() {
  this.getUser();
  }

  getUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.nombre;  // Asigna el nombre del usuario a la variable
      this.usermail = user.correo;
      this.userdate = user.fechaRegistro
    } else {
      this.router.navigate(['/login']);  // Redirigir si no hay usuario guardado
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

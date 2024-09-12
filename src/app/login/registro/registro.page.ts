import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user ={
    nombre: "",
    correo: "",
    password: ""
  }
  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  guardarUsuario() {
    // Validaciones
    const nombreValido = /^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(this.user.nombre);
    const passwordValido = this.user.password.length >= 5;
    const correoValido = /^[^\s@]+@[^\s@]+\.(com|cl)$/.test(this.user.correo);

    if (!nombreValido) {
      this.mostrarAlerta('El nombre debe tener al menos 4 caracteres, no contener caracteres especiales y no comenzar con un número.');
      return;
    }

    if (!passwordValido) {
      this.mostrarAlerta('La contraseña debe tener al menos 5 caracteres.');
      return;
    }

    if (!correoValido) {
      this.mostrarAlerta('El correo debe contener un "@" y terminar con ".com" o ".cl".');
      return;
    }

    // Guardar usuario
    localStorage.setItem('user', JSON.stringify(this.user));
    console.log('Usuario guardado:', this.user);

    this.router.navigate(['/login']);
  }

  getUser() {
    // Obtener usuario
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      console.log('Usuario recuperado:', this.user);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  username: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  getUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.nombre;  // Asigna el nombre del usuario a la variable
    } else {
      this.router.navigate(['/login']);  // Redirigir si no hay usuario guardado
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  config = {
    rutaAlmacenamiento: '',
    tiempoAutoguardado: 5,
    modoOscuro: false,
    notificacionesEmail: true,
  };

  guardarConfiguracion() {
    console.log('Configuración guardada:', this.config);
    // Aquí iría la lógica para guardar la configuración
  }
}

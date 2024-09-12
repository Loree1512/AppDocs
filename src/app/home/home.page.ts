import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username: string = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.getUser();
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
}



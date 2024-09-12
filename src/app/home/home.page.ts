import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username: string = '';
  
  constructor(private router: Router, private animationCtrl: AnimationController) {}

  async animateCard(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return;
  
    const card = target as HTMLElement;
    const animation = this.animationCtrl.create()
      .addElement(card)
      .duration(400)
      .keyframes([
        { offset: 0, transform: 'scale(1)', backgroundColor: 'white'  },
        { offset: 0.5, transform: 'scale(1.2)', backgroundColor: 'lightgreen'   },
        { offset: 1, transform: 'scale(1)' ,backgroundColor: 'white' }
      ]);
  
    await animation.play();
  }

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



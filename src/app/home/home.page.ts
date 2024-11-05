import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username: string = '';
  
  constructor(private router: Router, private animationCtrl: AnimationController, private storage: Storage) {}

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

  async ngOnInit() {
    const isLoggedIn = await this.storage.get("SessionID");
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}



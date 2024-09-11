import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan-doc',
  templateUrl: './scan-doc.page.html',
  styleUrls: ['./scan-doc.page.scss'],
})
export class ScanDocPage implements OnInit {
  capturedImage: string | undefined;
  documentName: string = '';
  documentType: string = '';

  constructor(private toastController: ToastController) { }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.error('Error al capturar la imagen', error);
      this.presentToast('Error al capturar la imagen. Por favor, intenta de nuevo.');
    }
  }

  async saveDocument() {
    if (!this.capturedImage || !this.documentName || !this.documentType) {
      this.presentToast('Por favor, capture una imagen y complete todos los campos.');
      return;
    }

    // Aquí iría la lógica para guardar el documento en tu backend
    console.log('Guardando documento:', {
      name: this.documentName,
      type: this.documentType,
      image: this.capturedImage
    });

    this.presentToast('Documento guardado con éxito!');
    this.resetForm();
  }

  resetForm() {
    this.capturedImage = undefined;
    this.documentName = '';
    this.documentType = '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

  ngOnInit() {
  }

}




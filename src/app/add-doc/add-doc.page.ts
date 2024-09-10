import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.page.html',
  styleUrls: ['./add-doc.page.scss'],
})
export class AddDocPage implements OnInit {
  documentName: string = '';
  documentCategory: string = '';
  documentDescription: string = '';
  selectedFile: File | null = null;

  constructor(
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  async onSubmit() {
    if (!this.documentName || !this.selectedFile || !this.documentCategory) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos requeridos.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append('name', this.documentName);
    formData.append('category', this.documentCategory);
    formData.append('description', this.documentDescription);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Enviar los datos al servidor (reemplaza 'API_URL' con la URL real de tu API)
    this.http.post('API_URL/upload', formData).subscribe(
      async (response) => {
        console.log('Documento subido con éxito', response);
        const toast = await this.toastController.create({
          message: 'Documento subido con éxito',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.resetForm();
      },
      async (error) => {
        console.error('Error al subir el documento', error);
        const toast = await this.toastController.create({
          message: 'Error al subir el documento. Por favor, intente nuevamente.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }

  resetForm() {
    this.documentName = '';
    this.documentCategory = '';
    this.documentDescription = '';
    this.selectedFile = null;
  }
}


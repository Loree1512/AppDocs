import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.page.html',
  styleUrls: ['./add-doc.page.scss'],
})
export class AddDocPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  documentName: string = '';
  selectedFile: File | null = null;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.documentName && this.selectedFile) {
      console.log('Subiendo documento:', this.documentName, this.selectedFile);
      // Aquí iría la lógica para subir el documento
    }
  }

}


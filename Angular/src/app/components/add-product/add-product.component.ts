import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ProductService} from './../../services/product-service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  imagen: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  reset()
  {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid && this.imagen) {

      let formData: {
        nombre: string;
        descripcion: string;
        precio: number;
        imagen: Uint8Array | Number[];
      };

      formData = {
        nombre: this.productForm.get('nombre')?.value,
        descripcion: this.productForm.get('descripcion')?.value,
        precio: this.productForm.get('precio')?.value,
        imagen: []
      };

      if (this.imagen) {
        this.convertFileToByteArray(this.imagen)
          .then((byteArray) => {
            formData.imagen = Array.from(byteArray);

            this.productService.addProduct(formData).subscribe(
        (response) => {
          console.log('Datos guardados correctamente:', response);
          alert('Datos guardados correctamente');
          this.reset();
        },
        (error) => {
          console.error('Error al guardar los datos:', error);
          alert('Error al subir nuevo producto');
        }
      );
          })
          .catch((error) => {
            console.error('Error al convertir el archivo:', error);
          });
      }

      }
    }
  }


import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ProductService } from '../../services/product-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductService,private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getAllProductsWithImages();
  }

  getAllProductsWithImages() {
    this.productService.allProducts().subscribe(
      (data: ProductModel[]) => {
        this.products = data.map(product => ({
          ...product,
          imagen: this.stringToImageUrl(product.imagen) // Convertir la cadena de texto a URL
        }));
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Método para convertir la cadena de texto a URL utilizando data URI
  stringToImageUrl(data: string) {
    const binary = atob(data); // Decodificar la cadena de texto de base64
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/jpeg' }); // Crear un blob de imagen
    return URL.createObjectURL(blob); // Crear la URL de la imagen a partir del blob
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-new-product',
  templateUrl: './create-new-product.component.html',
  styleUrls: ['./create-new-product.component.css']
})
export class CreateNewProductComponent implements OnInit {
  product: any = {
    type: '',
    mark: '',
    model: '',
    price: null,
    year: null,
    description: '',
    isAvailable: true,
    status: 'On Sale',
  };

  currentYear: number = new Date().getFullYear()
  image: any
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.product);
    console.log(this.image)
    const formData = new FormData();
    formData.append('type', this.product.type);
    formData.append('name', this.product.mark);
    formData.append('model', this.product.model);
    formData.append('price', this.product.price);
    formData.append('year', this.product.year);
    formData.append('description', this.product.description);
    formData.append('isAvailable', this.product.isAvailable);
    formData.append('status', this.product.status);
    formData.append('image', this.image);
    this.productService.postProduct(formData).subscribe(value =>{
      console.log(value)
      alert('The product was added')
    })
  }

  onImageSelected(event: any) {
    this.image = event.target.files[0];

  }
}

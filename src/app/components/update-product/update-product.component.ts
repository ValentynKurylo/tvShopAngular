import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: any = {
    type: '',
    name: '',
    model: '',
    price: null,
    year: null,
    description: '',
    isAvailable: true,
    status: 'On Sale',
  };
  ProductId: number = -1
  currentYear: number = new Date().getFullYear()
  image: any
  imageSelected = false
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.ProductId = param["id"]
      this.productService.getProductById(param["id"]).subscribe(value => {
        console.log(value)
        this.product = value
      })
    })
  }

  onSubmit() {
    console.log(this.image)
    console.log(this.product)
    console.log(this.image)
    // console.log(formData)
    if (confirm("Are you sure?")) {
      this.productService.upDateProductById(this.ProductId, this.product).subscribe(value => {
        console.log(value)
        alert('This product was edited')
      })
    }
      if (this.imageSelected) {
        const formData = new FormData()
        formData.append('image', this.image);
        let i = {
          'image': this.image
        }
        
        this.productService.patchImage(formData, this.ProductId).subscribe(value =>{
          console.log(value)
        })
      }
    }

  onImageSelected(event: any) {
    this.image = event.target.files[0];
    this.imageSelected = true
  }

}

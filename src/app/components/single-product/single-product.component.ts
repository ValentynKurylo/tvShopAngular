import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @Input() singleProduct: Product = {
    id: 0,
    type: '',
    name: '',
    model: '',
    price: 0,
    year: 0,
    description: '',
    image: '',
    isAvailable: false,
    status: ''
  }

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(value => {
      this.productService.getProductById(value['id']).subscribe(data =>{
        this.singleProduct = data
      })
    })
  }

}

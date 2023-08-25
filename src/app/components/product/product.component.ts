import { Component, Input, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() products: Product[] = [];
  searchText: string = '';
  sortBy: string = 'price';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minYear: number | null = null;
  maxYear: number | null = null;
  types: [] = [];
  selectedType: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(value => {
      this.products = value
    })
    this.productService.getTypes().subscribe(value =>{
      console.log(value)
      this.types = value
    })
  }
  


}

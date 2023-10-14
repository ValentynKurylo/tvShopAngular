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
  filtres = {
    minPrice: null,
    maxPrice:  null,
    minYear:  null,
    maxYear:  null,
    choseType: '',
    choseMark: '',
    sortBy: ''
  }

  types: [] = [];
  marks: [] = [];
  selectedType: string | null = null;
  showFiltersStatus: boolean = false
  currentYear: number = new Date().getFullYear()
  isUserAdmin: boolean = false

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts(this.filtres).subscribe(value => {
      console.log(value)
      this.products = value
    })
    this.productService.getTypes().subscribe(value =>{
      console.log(value)
      this.types = value
    })
    this.productService.getModels(this.filtres.choseType).subscribe(value => {
      console.log(value)
      this.marks = value
    })
    this.isAdminUserFunc()
    
  }
  isAdminUserFunc(){
    if(localStorage.getItem("role") === "admin"){
      this.isUserAdmin = true;
    }else {
      this.isUserAdmin = false
    }
  }
  showFiltersChange(){
    console.log('hello')
    this.showFiltersStatus = !this.showFiltersStatus
  }


  ChoseType(event: any) {
    this.filtres.choseType = event.target.value
    this.ngOnInit()
  }

  ChoseMark(event: any) {
    this.filtres.choseMark = event.target.value
    this.ngOnInit()
  }

  FindByFilters(event: any) {
    this.ngOnInit()
  }

  ChoseSortBy(event: any) {
    this.filtres.sortBy = event.target.value
    this.ngOnInit()
  }
}

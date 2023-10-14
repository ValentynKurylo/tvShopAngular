import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  @ViewChild('imageGallery') imageGallery!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;

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
  addImages = []
  isAdmin = false
  currentProductId: number = -1
  isShowFullImage: boolean = false;
  currentIndex: number = 0
  images: string[] = []
  currentImageSrc = ''
  addImageShow = false
  avatar = ''
  isModalOpen: boolean = false;


  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(value => {
      this.currentProductId = value['id']
      this.productService.getProductById(value['id']).subscribe(data =>{
        this.singleProduct = data
        this.avatar = data.image
      })
      this.productService.getProductImagesByProductId(value['id']).subscribe(data=>{
        console.log(data)
        for (const dataKey of data) {
          console.log(dataKey.image)
          this.images.push(dataKey.image)
        }
      })
    })
    this.isAdminUserFunc()

    if(this.isShowFullImage) {
      this.showImage(this.currentIndex);
    }
  }
  isAdminUserFunc(){
    if(localStorage.getItem("role") === "admin"){
      this.isAdmin = true;
    }else {
      this.isAdmin = false
    }
  }

  DeleteProduct() {
    if (confirm("Are you sure that you want delete this product?")) {
      this.productService.deleteProduct(this.currentProductId).subscribe(value =>{
        console.log(value)
      })
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex-=1;
      this.showImage(this.currentIndex);
    }else {
      this.currentIndex = this.images.length - 1
      this.showImage(this.currentIndex);
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex+=1;
      this.showImage(this.currentIndex);
    }else {
      this.currentIndex = 0
      this.showImage(this.currentIndex);
    }
  }
  showImageCountIndex(img: string){
    let index = this.images.findIndex((i) => i === img)
    console.log(img)
    console.log(index)
    this.showImage(index)
  }

  showImage(index: number) {
    this.currentImageSrc = this.images[index];
    this.isShowFullImage = true;
  }

  closeViewer() {
    this.isShowFullImage = false
  }

  onImageSelected(event: any) {
    this.addImages = event.target.files;
  }

  changeAddImage() {
    this.addImageShow = !this.addImageShow
  }

  addImageToProduct() {
    console.log(this.addImages)
    for(let i = 0; i < this.addImages.length; i++){
      const dataForm = new FormData()
      // @ts-ignore
      dataForm.append('productId', this.currentProductId)
      dataForm.append('image', this.addImages[i])
      this.productService.addImage(dataForm).subscribe(value=>{
        console.log(value)
      })
    }
    alert("Images was added")
  }
  ngAfterViewInit() {
    this.makeImageGalleryMovable();
  }

  makeImageGalleryMovable() {
    const gallery = this.imageGallery.nativeElement;
    const container = this.imageContainer.nativeElement;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    gallery.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
      isDown = false;
    });

    gallery.addEventListener('mouseup', () => {
      isDown = false;
    });

    gallery.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed here
      container.scrollLeft = scrollLeft - walk;
    });
  }

  OrderProduct() {
     this.isModalOpen = true
  }
  closeModal() {
    this.isModalOpen = false;
  }
}

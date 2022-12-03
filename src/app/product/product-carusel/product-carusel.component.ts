import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { ThemingService } from 'src/app/services/theming.service';
import { BaseProductService } from 'src/app/services/base-product.service';
import { Product } from '../products.model';
@Component({
  selector: 'app-product-carusel',
  templateUrl: './product-carusel.component.html',
  styleUrls: ['./product-carusel.component.scss']
})
export class ProductCaruselComponent extends ThemeableComponent implements OnInit {
  manePicture: string =""; //at start, mane picture should be first picture in array, see (*1)

  @Input() caruselMeniuSize: number=4; //pearent will set number, defult is 4
  @Input() imgesSource: string[]=[];; //pearent will give string [] for pictures, defult is null
  picturMenuPointer: number=0; //this number shows were should be focus, in picture menu list
  sourseArrayPointer: number=0; //this number points spot from we should start coping picturs

  contentError: string="https://image.shutterstock.com/image-vector/no-image-available-icon-flat-260nw-1240855801.jpg";//error picture, for no content
  pictures: string [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BaseProductService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params["id"]
      this.service.getProductById(id).subscribe(p => {
        if (!p) {
          this.router.navigate(["urlNotFound"], { skipLocationChange: true })
        } else {
          if(p.images.length>0){
            this.imgesSource=p.images;
            if(this.caruselMeniuSize>p.images.length) this.caruselMeniuSize=p.images.length; //if there is less images than carusel needs reduce size
          }
        }
      });
    })
    this.getSorce();
    this.fillPictures();
    if(this.pictures.length>0){//(*1), at start, mane picture should be first picture in array
      this.manePicture=this.pictures[0];
    }else{ // if there is not content in pictures, should show error
      this.manePicture=this.contentError;
    }
  }

  fillPictures(): void{// fills picture array, from source
    this.pictures = [] ;
    for(let i=0; i<this.caruselMeniuSize; i++){
      this.pictures[i]=this.imgesSource[this.sourseArrayPointer+i];
    }     
  }

  getSorce(): void{//FUC (function under construction), it will get picture array for carusel
    this.fixArraySizeError();
    console.log("tryed to get sourse");
  }
  fixArraySizeError(): void{ //FUC, this function will check if picture array size is more than pictureSource, if so multiplyes content in pictureSource
    console.log("tring to get sourse, cheking for size error");
  }

  perviousButton(): void{ // clicking picture meniu button "pervious"
    if(this.manePicture!=this.imgesSource[0]){
      //this button should not work if we are at the start of product pictures
      if(this.picturMenuPointer>0 ){
        //if you have pervious picture in pictures mini meniu
        this.picturMenuPointer--;
        this.manePicture=this.pictures[this.picturMenuPointer];
      }else if(this.sourseArrayPointer>0){
        //if you do not have pervious picture in pictures mini meniu, but you have more in sourse 
        this.sourseArrayPointer--;
        this.fillPictures();
        //this.manePicture=this.pictures[0];
        this.changeManePicture(this.picturMenuPointer);
      }

    }else if(this.sourseArrayPointer<0){//temporery
      console.log("ERROR!!! picture menius pointer is negative number");
    }
  }

  nextButton(): void{ // clicking picture meniu button "next"
    if(this.manePicture!=this.imgesSource[this.imgesSource.length-1]){
      //this button should not work if we are at the end of product pictures
      if(this.manePicture!=this.pictures[this.caruselMeniuSize-1]){
        //if you have next picture in pictures mini meniu
        this.picturMenuPointer++;
        this.manePicture=this.pictures[this.picturMenuPointer];
      }else if(this.sourseArrayPointer<(this.imgesSource.length-1)){
        //if you do not have next picture in pictures mini meniu, but you have more in sourse
        this.sourseArrayPointer++;
        this.fillPictures();
        //this.manePicture=this.pictures[this.caruselMeniuSize-1];
        this.changeManePicture(this.picturMenuPointer);
      }

    }else if(this.sourseArrayPointer>(this.imgesSource.length-this.caruselMeniuSize)){//temporery
      console.log("ERROR!!! picture menius pointer out of bound");
    }
  }

  changeManePicture(index: number): void{
    this.picturMenuPointer=index;
    this.manePicture=this.pictures[index];
  }
}

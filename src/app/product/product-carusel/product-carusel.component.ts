import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-carusel',
  templateUrl: './product-carusel.component.html',
  styleUrls: ['./product-carusel.component.scss']
})
export class ProductCaruselComponent implements OnInit {
  manePicture: string =""; //at start, mane picture should be first picture in array, see (*1)

  caruselMeniuSize: number=4; //UC (under construction), there should not be 4 here !!!, pearent should be able to set number
  picturMenuPointer: number=0; //this number shows were should be focus, in picture menu list
  sourseArrayPointer: number=0; //this number points spot from we should start coping picturs

  contentError: string="https://image.shutterstock.com/image-vector/no-image-available-icon-flat-260nw-1240855801.jpg";//error picture, for no content
  pictures: string [] = [];
  //picturesSorce=[]; //UC, for future 
  pictureSource =[
    "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Hero_Image_Thumbnail.max-1000x1000.jpg",
    "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Google_Pixel_7_Ultra_Pixel_7_Pixel_7_Pro_Pixel_Fold_Pixel_Tablet_Kamera_Details_im_Code_entdeckt.jpeg",
    "https://fdn.gsmarena.com/imgroot/news/22/10/pixel-7-7pro-official/inline2/-1200/gsmarena_003.jpg",
    "https://9to5toys.com/wp-content/uploads/sites/5/2022/10/google-pixel-7-pro-1.jpg",
    "https://i.pcmag.com/imagery/reviews/066u20pOsJx1BG4PfEAD0RB-24..v1665583071.jpg",
    "https://imgix.bustle.com/uploads/image/2022/10/12/c81e59c2-8e6e-4217-b80e-28005ccdaeaf-dsc00543-2.jpg?w=2000&h=980&fit=crop&crop=faces&auto=format%2Ccompress",
    "https://mobiledrop.in/wp-content/uploads/2022/10/Google-Pixel-7-Pro-Review-Images-01.jpg",
    "https://media.wired.com/photos/633dc4042d9f11bddfef6a1a/master/w_1600%2Cc_limit/Google-Pixel-7-All-Colors-Gear.jpg",
    "https://www.91-cdn.com/hub/wp-content/uploads/2022/09/Pixel-6a-1.jpg",
    "https://specs-tech.com/wp-content/uploads/2021/11/Google-Pixel-7a.jpg",
    "https://www.ixbt.com/img/n1/news/2022/9/0/pixel_large.JPG",
    "https://www.electrorates.com/blogimg/Google_Pixel_7a.png",
    "https://telecomtalk.info/wp-content/uploads/2022/10/google-pixel-7a-launch-is-near-amazon.jpeg"
  ];

  constructor() { }

  ngOnInit(): void {
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
      this.pictures[i]=this.pictureSource[this.sourseArrayPointer+i];
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
    if(this.manePicture!=this.pictureSource[0]){
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
    if(this.manePicture!=this.pictureSource[this.pictureSource.length-1]){
      //this button should not work if we are at the end of product pictures
      if(this.manePicture!=this.pictures[this.caruselMeniuSize-1]){
        //if you have next picture in pictures mini meniu
        this.picturMenuPointer++;
        this.manePicture=this.pictures[this.picturMenuPointer];
      }else if(this.sourseArrayPointer<(this.pictureSource.length-1)){
        //if you do not have next picture in pictures mini meniu, but you have more in sourse
        this.sourseArrayPointer++;
        this.fillPictures();
        //this.manePicture=this.pictures[this.caruselMeniuSize-1];
        this.changeManePicture(this.picturMenuPointer);
      }

    }else if(this.sourseArrayPointer>(this.pictureSource.length-this.caruselMeniuSize)){//temporery
      console.log("ERROR!!! picture menius pointer out of bound");
    }
  }

  changeManePicture(index: number): void{
    this.picturMenuPointer=index;
    this.manePicture=this.pictures[index];
  }
}

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
    "https://www.google.com/search?q=pixel+7+pro&sxsrf=ALiCzsY6Br_HkvrtMdpRdTk-xMOyDy45TA:1668784166885&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjd9eS7gbj7AhXqRvEDHXbYBs0Q_AUoAnoECAIQBA&biw=1650&bih=963&dpr=1#imgrc=FxjQxwKTKiTuaM"
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


}

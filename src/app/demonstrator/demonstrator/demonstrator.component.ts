import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { positionInPercentage } from '../positionsBB/positions';

@Component({
  selector: 'app-demonstrator',
  templateUrl: './demonstrator.component.html',
  styleUrls: ['./demonstrator.component.less']
})
export class DemonstratorComponent implements OnInit {
  loading: boolean = true;
  previewImages: string[] = []
  imageHeight: number = 0;
  videoHeight: number = 0;

  chosenDamageType: string = undefined;
  boundingBoxButtonVisible: boolean = false;
  maskButtonVisible: boolean = false;
  bbButtonPressed: boolean = false;

  enhancedDamagedPartSrc: string = undefined;

  picture_keys: string[] = ['rungen', 'holes', 'steps']
  pictures: any = {
    'rungen': {
      imgSource: `assets/rungen`,
      images: [1, 2, 3, 4]
    },
    'holes': {
      imgSource: 'assets/holes',
      images: [1, 2, 3]
    },
    'steps': {
      imgSource: 'assets/defrag',
      images: [1, 2, 3, 4, 5]
    }
  }

  projectDescription: string = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
   labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
   Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
   labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

  explanationText: string = this.projectDescription.split("").reverse().join("");

  coords: { x1: number, y1: number, x2: number, y2: number }[][] = [];
  private amountLoaded: number = 0;
  started: boolean = false;

  ngOnInit(): void {
    this.calculateVideoHeight();
    this.selectRandomImages();
    this.calculateImageHeight();

    this.loading = false;
  }

  calculateVideoHeight(): void {
    const img_area: HTMLElement = document.getElementById('image-area')
    const height: number = img_area.clientHeight;

    this.videoHeight = (height*0.85) / 2;
  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  selectImage(): string {
    let key: string = this.picture_keys[this.randomIntFromInterval(0, 2)];
    let pics = this.pictures[key];
    let src: string = pics.imgSource;
    let chosenImage: number = this.randomIntFromInterval(1, pics.images.length)

    return `${src}/${key}_${chosenImage}.jpg`
  }

  selectRandomImages(): void {
    let imageSet: Set<string> = new Set<string>();
    while (imageSet.size < 5) {
      imageSet.add(this.selectImage());
    }
    this.previewImages = Array.from(imageSet.values());
  }

  calculateBBcoords(height, maxWidth): void {
    positionInPercentage[this.chosenDamageType].forEach((imgInfo, idx) => {
      const scalingFactor: number = (height / imgInfo.original_y);
      const theoreticalNewWidth: number = (imgInfo.original_x * scalingFactor);
      const width = theoreticalNewWidth > maxWidth ? maxWidth : theoreticalNewWidth;

      let tmp = [];
      imgInfo.coords.forEach((c) => {
        tmp.push({
          x1: c.x1 * width,
          y1: c.y1 * height,
          x2: c.x2 * width,
          y2: c.y2 * height,
        });
      });
      this.coords.push(tmp);
    });
  }

  calculateImageHeight(amount: number = 5) {
    const img_area: HTMLElement = document.getElementById('image-area')
    const height: number = img_area.clientHeight;
    const width: number = img_area.clientWidth * .9;

    this.imageHeight = (height * 0.98) / amount;
    this.imageHeight = this.imageHeight - 1.5*(this.imageHeight / 100);

    this.coords = []
    if (this.bbButtonPressed) {
      this.calculateBBcoords(this.imageHeight, width);
    }
  }

  setImages(pre: string = "", fileType: string = '.jpg'): void {
    const pics = this.pictures[this.chosenDamageType];
    const src: string = pics.imgSource;

    this.previewImages = []
    pics.images.forEach((i: number) => {
      this.previewImages.push(`${src}/` + pre + `${this.chosenDamageType}_${i}` + fileType)
    });
    this.calculateImageHeight(this.previewImages.length);
  }

  changePreviewImages(): void {
    this.loading = true;
    this.bbButtonPressed = false;
    this.maskButtonVisible = false;
    this.setImages()
    this.boundingBoxButtonVisible = true;
    this.loadImages();
    // this.loading = false;
  }

  showBoundingBoxImages(): void {
    this.loading = true;
    this.bbButtonPressed = true;
    this.setImages('seg_', '.jpg')
    this.maskButtonVisible = true;
    this.loadImages();
    // this.loading = false;
  }

  showMaskImages(): void {
    this.loading = true;
    this.bbButtonPressed = false;
    this.setImages('mask_', '.png');
    this.loadImages();
    // this.loading = false;
  }

  mouseEnteredArea(image_idx, damage_idx: number) {
    console.log(`Entered bounding box #${damage_idx} of image ${image_idx}.`)
  }

  mouseLeftArea(): void {
    console.log("Left bounding box.")
  }

  change(image_idx: number, damage_idx: number) {
    let suf = "";
    if (this.chosenDamageType != 'steps') {
      suf = `_${damage_idx}`
    }
    const src = this.pictures[this.chosenDamageType].imgSource;
    this.enhancedDamagedPartSrc = `${src}/` + 'crop_' + `${this.chosenDamageType}_${image_idx+1}` + `${suf}` + `.jpg`
  }

  loadImages() {
    this.amountLoaded = 0;
    for(let prevImage of this.previewImages) {
      let img = new Image();
      let segImg = new Image();
      let maskImg = new Image();

      img.onload = () => {
        this.loaded();
      }

      segImg.onload = () => {
        this.loaded();
      }

      maskImg.onload = () => {
        this.loaded();
      }

      img.src = prevImage;
    }
  }

  loaded() {
    this.amountLoaded+=1;
    if (this.amountLoaded === this.previewImages.length) {
      this.loading = false;
    }
  }
}

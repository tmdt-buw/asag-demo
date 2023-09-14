import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { positionInPercentage } from '../positionsBB/positions';
import { segmentationText, explanationText, projectDescription, damageDescriptions } from "../descriptionTexts";

@Component({
  selector: 'app-demonstrator',
  templateUrl: './demonstrator.component.html',
  styleUrls: ['./demonstrator.component.less']
})
export class DemonstratorComponent implements OnInit {
  loading: boolean = true;
  showHeightWidthWarning: boolean = false;
  minHeight: number = 540;
  minWidth: number = 910

  shownImages: string[] = []
  segImages: string[] = []
  maskImages: string[] = []
  imageHeight: number = 0;

  @ViewChild('videoPlayer1') videoPlayer1;
  videoHeight: number = 0;
  videoWidth: number = 0;

  chosenDamageType: string = undefined;
  boundingBoxButtonVisible: boolean = false;
  maskButtonVisible: boolean = false;
  bbButtonPressed: boolean = false;
  maskButtonPressed: boolean = false;

  damagedPartModalVisible: boolean = false;

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

  coords: { x1: number, y1: number, x2: number, y2: number }[][] = [];
  private amountLoaded: number = 0;

  started: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.selectRandomImages();
    this.calculateImageHeight();
    this.checkForSizeAndShowWarning();

    this.loading = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(_: any): void {
    this.loading = true;
    this.calculateImageHeight();
    this.calculateVideoHeight();
    this.checkForSizeAndShowWarning();
    this.loading = false;
  }

  calculateVideoHeight(): void {
    // w = width of the video
    const w: number = this.videoPlayer1.nativeElement.videoWidth;
    // h = height of the video
    const h: number = this.videoPlayer1.nativeElement.videoHeight;

    const img_area: HTMLElement = document.getElementById('image-area')
    const maximalAllowedHeight: number = img_area.clientHeight;
    const maximalAllowedWidth: number = img_area.clientWidth * .9;

    let finalHeight: number = (maximalAllowedHeight*0.85) / 2;
    let scaling: number = finalHeight / h;
    let resolvingWidth: number = w * scaling;

    if (resolvingWidth * 2 > maximalAllowedWidth) {
      resolvingWidth = maximalAllowedWidth / 2
      scaling = resolvingWidth / w;
      finalHeight = scaling * h;
    }

    this.videoHeight = finalHeight;
    this.videoWidth = resolvingWidth;
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
    this.shownImages = Array.from(imageSet.values());
  }

  calculateBBcoords(height, maxWidth): void {
    positionInPercentage[this.chosenDamageType].forEach((imgInfo) => {
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

    if (this.imageHeight !== (height * 0.98) / amount) {
      this.imageHeight = (height * 0.98) / amount;
      this.imageHeight = this.imageHeight - 1.5 * (this.imageHeight / 100);
    }

    this.coords = []
    if (this.chosenDamageType) {
      this.calculateBBcoords(this.imageHeight, width);
    }
  }

  setImages(pre: string = "", fileType: string = '.jpg'): void {
    const pics = this.pictures[this.chosenDamageType];
    const src: string = pics.imgSource;

    pics.images.forEach((i: number) => {
      this.shownImages.push(`${src}/` + pre + `${this.chosenDamageType}_${i}` + fileType)
      this.segImages.push(`${src}/` + 'seg_' + `${this.chosenDamageType}_${i}` + fileType)
      this.maskImages.push(`${src}/` + 'mask_' + `${this.chosenDamageType}_${i}` + '.png')
    });

    this.calculateImageHeight(this.shownImages.length);
  }

  resetEverything(): void {
    this.bbButtonPressed = false;
    this.maskButtonPressed = false;
    this.maskButtonVisible = false;
    this.boundingBoxButtonVisible = false;
    this.shownImages = []
    this.segImages = []
    this.maskImages = []

    this.amountLoaded = 0;
  }

  changePreviewImages(): void {
    this.loading = true;

    this.resetEverything();
    this.setImages();
    this.loadImages();

    this.boundingBoxButtonVisible = true;
  }

  showBoundingBoxImages(): void {
    this.calculateImageHeight(this.shownImages.length);
    this.bbButtonPressed = true;
    this.maskButtonVisible = true;
  }

  showMaskImages(): void {
    this.maskButtonPressed = true;
  }

  mouseEnteredArea(image_idx, damage_idx: number) {
    console.log(`Entered bounding box #${damage_idx} of image ${image_idx}.`)
  }

  mouseLeftArea(): void {
    console.log("Left bounding box.")
  }

  change(image_idx: number, damage_idx: number) {
    const src = this.pictures[this.chosenDamageType].imgSource;
    this.enhancedDamagedPartSrc = `${src}/` + 'crop_' + `${this.chosenDamageType}_${image_idx+1}` + `_${damage_idx}` + `.jpg`
  }

  loadImages(): void {
    this.shownImages.forEach((src, i) => {
      let img = new Image();
      let segImg = new Image();
      let maskImg = new Image();

      img.onload = () => {
        this.loaded()
      }

      segImg.onload = () => {
        this.loaded()
      }

      maskImg.onload = () => {
        this.loaded()
      }

      img.src = src;
      segImg.src = this.segImages[i];
      maskImg.src = this.maskImages[i];
    })
  }

  loaded() {
    this.amountLoaded+=1;
    if (this.amountLoaded === (this.shownImages.length + this.segImages.length + this.maskImages.length)) {
      this.loading = false;
    }
  }

  openDamagedPartModal(image_idx: number, damage_idx: number) {
    this.change(image_idx, damage_idx);
    this.damagedPartModalVisible = true;
  }

  getExplanationText(): string {
    if (this.maskButtonPressed) {
      return segmentationText;
    }

    if (this.bbButtonPressed || this.chosenDamageType !== undefined) {
      return damageDescriptions[this.chosenDamageType];
    }

    if (this.started) {
      return explanationText;
    }

    return projectDescription;
  }

  resetToStartPage() {
    this.resetEverything();
    this.chosenDamageType = undefined;
    this.started = false;
    this.selectRandomImages();
  }

  checkForSizeAndShowWarning(): void {
    const screenWidth: number = window.innerWidth;
    const screenHeight: number = window.innerHeight;

    if (screenWidth <= this.minWidth || screenHeight < this.minHeight) {
      this.showHeightWidthWarning = true;
    }
  }
}

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { positionInPercentage } from '../positionsBB/positions';
import { segmentationText, explanationText, projectDescription, damageDescriptions, slideTexts, slideTitles } from "../descriptionTexts";

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


  shownImages: [string, string, number][] = []
  segImages: string[] = []
  maskImages: string[] = []
  imageHeight: number = 0;
  imageWidth: number = 0;

  @ViewChild('videoPlayer1') videoPlayer1;
  videoHeight: number = 0;
  videoWidth: number = 0;

  chosenDamageType: string = 'random';
  boundingBoxButtonVisible: boolean = false;
  bbButtonPressed: boolean = false;
  maskButtonVisible: boolean = false;
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
      imgSource: 'assets/steps',
      images: [1, 2, 3, 4, 5]
    }
  }

  coords: { x1: number, y1: number, x2: number, y2: number }[][] = [];
  private amountLoaded: number = 0;
  protected readonly slideTitles: {} = slideTitles;
  protected readonly slideTexts: {} = slideTexts;

  started: boolean = false;
  slideNumber: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.selectRandomImages();
    this.calculateImageHeight();
    this.setBoundingBoxesForSegImg()
    this.checkForSizeAndShowWarning();

    this.loading = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(_: any): void {
    this.loading = true;
    this.calculateImageHeight();
    if (this.slideNumber == 0) {
      this.calculateVideoHeight();
    }
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

    let finalHeight: number = (maximalAllowedHeight*0.85);
    let scaling: number = finalHeight / h;
    let resolvingWidth: number = w * scaling;

    this.videoHeight = finalHeight;
    this.videoWidth = resolvingWidth * 0.75;
  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  selectImage(): [string, string, number] {
    let key: string = this.picture_keys[this.randomIntFromInterval(0, 2)];
    let pics = this.pictures[key];
    let src: string = pics.imgSource;
    let chosenImage: number = this.randomIntFromInterval(1, pics.images.length)

    return [`${src}/${key}_${chosenImage}.jpg`, key, chosenImage]
  }

  selectRandomImages(): void {
    let imageSet: Set<[string, string, number]> = new Set<[string, string, number]>();
    let intermediateSet: Set<string> = new Set<string>();
    let lastSize = intermediateSet.size
    while (intermediateSet.size < 5) {
      let img: [string, string, number] = this.selectImage()
      intermediateSet.add(img[0])

      if (lastSize < intermediateSet.size) {
        imageSet.add(img);
      }
      lastSize = intermediateSet.size
    }
    this.shownImages = Array.from(imageSet.values());
  }

  setBoundingBoxesForSegImg(): void {
    this.shownImages.forEach((img: [string, string, number]) => {
      const bbCords = positionInPercentage[img[1]][img[2]-1];
      const img_area: HTMLElement = document.getElementById('image-area')
      const height: number = this.imageHeight;
      const width: number = img_area.clientWidth * .9;

      let tmp = [];
      bbCords.coords.forEach((c: { x1: number; y1: number; x2: number; y2: number; }) => {
        tmp.push({
          x1: c.x1 * width,
          y1: c.y1 * height,
          x2: c.x2 * width,
          y2: c.y2 * height,
        });
      })

      this.coords.push(tmp);
    })

    this.setSegAndMaskImages();
  }

  setSegAndMaskImages(): void {
    this.shownImages.forEach((img) => {
      this.segImages.push(`assets/${img[1]}/` + 'seg_' + `${img[1]}_${img[2]}.jpg`)
      this.maskImages.push(`assets/${img[1]}/` + 'mask_' + `${img[1]}_${img[2]}.png`)
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

    this.imageWidth = width;
  }

  resetEverything(): void {
    this.maskButtonPressed = false;
    this.maskButtonVisible = false;
    this.bbButtonPressed = false;
    this.boundingBoxButtonVisible = false;
    this.shownImages = []
    this.segImages = []
    this.maskImages = []

    this.amountLoaded = 0;
  }

  changePreviewImages(): void {
    this.loading = true;

    this.resetEverything();
    this.loadImages();

    this.boundingBoxButtonVisible = true;
  }
  changeDamageType(): void {
    this.resetEverything();
    this.loading = true;
    if (['steps', 'rungen', 'holes'].includes(this.chosenDamageType)) {
      const pics = this.pictures[this.chosenDamageType];
      const src: string = pics.imgSource;

      pics.images.forEach((i: number) => {
        this.shownImages.push([`${src}/${this.chosenDamageType}_${i}` + '.jpg', this.chosenDamageType, i])
      });
      this.calculateImageHeight(this.shownImages.length);
    } else {
      this.selectRandomImages();
    }

    this.setBoundingBoxesForSegImg()
    this.loadImages();
  }

  mouseEnteredArea(image_idx: any, damage_idx: number) {
    console.log(`Entered bounding box #${damage_idx} of image ${image_idx}.`)
  }

  mouseLeftArea(): void {
    console.log("Left bounding box.")
  }

  change(image_idx: number, damage_idx: number) {
    const damageType = this.shownImages[image_idx][1]
    const usedImageIdx = this.shownImages[image_idx][2]

    const src = this.pictures[damageType].imgSource;
    this.enhancedDamagedPartSrc = `${src}/` + 'crop_' + `${damageType}_${usedImageIdx}` + `_${damage_idx}` + `.jpg`
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

      img.src = src[0];
      segImg.src = this.segImages[i];
      maskImg.src = this.maskImages[i];
    });
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

    if (this.chosenDamageType !== undefined) {
      return damageDescriptions[this.chosenDamageType];
    }

    if (this.started) {
      return explanationText;
    }

    return projectDescription;
  }

  resetToStartPage() {
    this.resetEverything();
    this.chosenDamageType = 'random';
    this.selectRandomImages();
  }

  checkForSizeAndShowWarning(): void {
    const screenWidth: number = window.innerWidth;
    const screenHeight: number = window.innerHeight;

    if (screenWidth <= this.minWidth || screenHeight < this.minHeight) {
      this.showHeightWidthWarning = true;
    }
  }

  next(): void {
    this.slideNumber = this.slideNumber < 1 ? this.slideNumber + 1 : this.slideNumber;
  }

  prev(): void {
    this.resetToStartPage();
    this.slideNumber = this.slideNumber > 0 ? this.slideNumber - 1 : this.slideNumber;
  }

  detect() {
    this.bbButtonPressed = true;
  }

  segement() {
    this.maskButtonPressed = true;
  }
}

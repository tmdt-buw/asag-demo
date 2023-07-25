import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demonstrator',
  templateUrl: './demonstrator.component.html',
  styleUrls: ['./demonstrator.component.less']
})
export class DemonstratorComponent implements OnInit {
  loading: boolean = true;
  previewImages: string[] = []
  imageHeight: number = 0;

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
  explanationText: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

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

  calculateImageHeight() {
    this.imageHeight = (window.innerHeight * 0.99) / 5;
    this.imageHeight = this.imageHeight - 1.5*(this.imageHeight / 100);
  }

  selectRandomImages(): void {
    let imageSet = new Set<string>();
    while (imageSet.size < 5) {
      imageSet.add(this.selectImage());
    }
    this.previewImages = Array.from(imageSet.values());
  }

  ngOnInit(): void {
    this.selectRandomImages();
    this.calculateImageHeight();
    this.loading = false;
  }
}

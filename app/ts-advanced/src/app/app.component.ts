import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLDivElement>;

  width: number = null;
  height: number = null;

  constructor() {}

  ngAfterViewInit(): void {
    const { width, height } = this.container.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }
}

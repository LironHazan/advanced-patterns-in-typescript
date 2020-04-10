import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ts-canvas-anim',
  template: `<canvas class="canvas" [width]="width" [height]="height" #canvasRef></canvas>`,
  styleUrls: ['./ts-canvas-anim.component.css']
})
export class TsCanvasAnimComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  @Input() width: number = 600;
  @Input() height: number = 300;

  //Todo - go offscreenCanvas

  setText(x, y) {
    return (ctx: CanvasRenderingContext2D, time: number, text) => {
        ctx.font = "20px monospace";
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, // TypeScript
          x + + Math.sin((50 + x + (time / 10)) / 100) * 3,
          y + + Math.sin((45 + x + (time / 10)) / 100) * 4);
      }
  }

  animate(ctx: CanvasRenderingContext2D, fns: Function[]) {
    ctx.clearRect(0, 0, this.width, this.height);
    const time = new Date().getTime();
    for (const draw of fns) {
      draw(ctx, time, 'TypeScript');
    }
    requestAnimationFrame(() => this.animate(ctx, fns));
  }


  renderCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas?.getContext('2d');

    const fns: Function[] = [];

    for(let x = 0; x < canvas.width; x++) {
      for(let y = 0; y < canvas.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
          if(Math.round(Math.random()) == 1) {
            fns.push(this.setText(x, y));
          }
        }
      }
    }
    this.animate(ctx, fns);
  }

  ngAfterViewInit(): void {
    this.renderCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.width?.currentValue) {
      this.width = changes.width.currentValue;
      this.renderCanvas();
    }
    if (changes?.height?.currentValue) {
      this.height = changes.height.currentValue;
      this.renderCanvas();
    }
  }
}

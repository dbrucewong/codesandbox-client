import getScrollPos from '../../../utils/scroll';

import Dot from './Dot';
import Wave from './Wave';

class Canvas {
  stage: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dots: Array<Dot> = [];
  waves: Array<Wave> = [];

  lastDelta: number = Date.now();
  cubeX: number = 1300;
  cubeY: number = 500;

  constructor(el: HTMLElement) {
    this.stage = el;
    this.ctx = el.getContext('2d');

    this.stage.height = window.innerHeight;
    this.stage.width = window.innerWidth;
  }

  init() {
    const gridSize = 60;
    const dotAmountHeight = Math.floor(this.stage.height / gridSize);
    const dotAmountWidth = Math.floor(this.stage.width / gridSize);

    for (let i = 0; i < dotAmountHeight; i++) {
      for (let j = 0; j < dotAmountWidth; j++) {
        // Create a dot
        const x = j * gridSize + gridSize * Math.random();
        const y = i * gridSize + gridSize * Math.random();
        const dot = new Dot(x, y, [108, 174, 221], 1);

        // Push to into an array of dots
        this.dots.push(dot);
      }
    }
  }

  loop = () => {
    if (getScrollPos().y > this.stage.height) {
      requestAnimationFrame(this.loop);
      return;
    }

    this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);

    const delta = Date.now() - this.lastDelta;

    let distX;
    let distY;
    let power = 0.2;

    let startRadius;
    let endRadius;
    let middle;
    let top;

    if (this.wave) {
      const radius = this.wave.waveWidth;

      this.wave.update(delta);

      startRadius = this.wave.waveRadius - radius / 2 - radius;
      endRadius = this.wave.waveRadius + radius / 2 - radius;
      middle = startRadius + (endRadius - startRadius) / 2;
      top = -(middle - startRadius) * (middle - endRadius);
    }

    for (let i = 0; i < this.dots.length; i++) {
      distX = Math.abs(this.dots[i].x - this.cubeX);
      distY = Math.abs(this.dots[i].y - this.cubeY);
      const distance = Math.sqrt(distX * distX + distY * distY);

      this.dots[i].setAlpha(Math.max(0.2, (1 - distance / 300) * 2));
      this.dots[i].setSize(Math.max(1.5, (1 - distance / 300) * 4));
      this.dots[i].update(delta);

      if (this.wave) {
        const dirX = this.dots[i].x - this.wave.x;
        const dirY = this.dots[i].y - this.wave.y;
        const distance = Math.sqrt(dirX * dirX + dirY * dirY);

        if (distance < middle) {
          this.dots[i].setColor(this.wave.color);
        }

        power = Math.max(
          0,
          -((distance - startRadius) * (distance - endRadius)) / top
        );

        if (distance > startRadius && distance < endRadius) {
          this.dots[i].x += (power - 0.5) * (dirX / distance) * 5;
          this.dots[i].y += (power - 0.5) * (dirY / distance) * 5;

          this.dots[i].alpha *= (power + 1) ** 4;
          this.dots[i].size *= power * 0.5 + 1;
        }
      }

      this.dots[i].draw(this.ctx);
    }

    this.lastDelta = Date.now();

    requestAnimationFrame(this.loop);
  };

  setParticleColor(color: Array<number>) {
    requestAnimationFrame(() => {
      this.dots.forEach(d => d.setColor(color));
    });
  }

  makeWave(x: number, y: number, color: Array<number>) {
    this.wave = new Wave(x, y, color);
  }

  setCubePos(x: number, y: number) {
    this.cubeX = x;
    this.cubeY = y;

    for (let i = 0; i < this.dots.length; i++) {
      const distX = this.cubeX - this.dots[i].x;
      const distY = this.cubeY - this.dots[i].y;

      const distance = Math.sqrt(distX * distX + distY * distY);

      this.dots[i].setSpeed(
        distX / distance / 20 * ((Math.random() + 0.1) * 0.2),
        distY / distance / 20 * ((Math.random() + 0.1) * 0.2)
      );
    }
  }
}

export default function start(el: HTMLElement) {
  const c = new Canvas(el);

  c.init();

  c.loop();
  return c;
}

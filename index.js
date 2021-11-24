const colors = require('colors');
const process = require('process');
const readline = require('readline');
const {
  stdin,
  stdout
} = require('process')


class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  init() {
    this.pixels = ('#'.repeat(this.width) + "\n").repeat(this.height).split('\n').map(row => row.split(''));
    readline.emitKeypressEvents(stdin);
    if (stdout.isTTY) { //#endregion
      stdin.setRawMode(true);
    }
    this.render();
  }

  updatePixel(x, y, char, color = 'white') {
    this.pixels[y - 1][x - 1] = char[color];
    this.render();
  }

  render() {
    console.clear();

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        stdout.write(this.pixels[y][x]);
        stdout.cursorTo(x,y);
      }
      stdout.cursorTo(0, y);
      
    }
  }
}

class Controller {
  constructor() {

    this.x = 0;
    this.y = 0;
  }

  init(screen) {
    this.move(0,0);


  }
  move(x, y) {
    stdout.write('#')
    this.x += x;
    this.y += y;
    stdout.cursorTo(this.x, this.y);
    stdout.write('☻');
    stdout.cursorTo(this.x, this.y);
    
  }

}

const fos = {
  screen: new Screen(64, 32),
  player: new Controller()
};

const {
  screen,
  player,
} = fos;

screen.init();
player.init();

stdin.on('keypress', (chunk, key) => {
  if (key && key.name == 'q') {
    console.clear();
    process.exit();
  } else if (key) {

    switch (key.name) {
      case 'up':
        player.move(0, -1);
        break;
      case 'down':
        player.move(1, 1);
      case 'left':
        player.move(-1, 0);
        break;
      case 'right':
        player.move(1, 0);
        break;
      default:
        player.move(0, 0)
    }
  }

});
import { Block } from '../../scripts/aem.js';

export default class Hero extends Block {
  constructor() {
    super();

    this.render();
  }

  render() {
    const [image, title] = [...this.children];

    image.setAttribute('slot', 'picture');
    title.setAttribute('slot', 'title');
  }
}

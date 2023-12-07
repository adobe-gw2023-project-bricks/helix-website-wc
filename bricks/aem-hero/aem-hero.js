import { Brick } from '../../scripts/aem.js';

export default class Hero extends Brick {
  connectedCallback() {
    const image = this.querySelectorFromRoot('picture');
    const title = this.querySelectorFromRoot('h1');

    this.fillTemplateSlot('picture', image);
    this.fillTemplateSlot('title', title);
  }
}

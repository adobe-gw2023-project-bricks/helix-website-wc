import { Brick } from '../../scripts/aem.js';

export default class Hero extends Brick {
  connectedCallback() {
    const image = this.root.querySelector('picture');
    const text = this.root.querySelector('h1').parentElement;

    this.shadowRoot.querySelector('.image-wrapper').append(image);
    this.shadowRoot.querySelector('.inner-content').append(...text.children);

    this.shadowRoot.querySelector('a').classList.add('button', 'primary', 'large');
  }
}

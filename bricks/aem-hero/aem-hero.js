import { Brick } from '../../scripts/aem.js';

export default class Hero extends Brick {
  connectedCallback() {
    const image = this.root.querySelector('picture');
    const text = this.root.querySelector('h1').parentElement;

    if (!this.classList.contains('multiple-cta')) {
      const ctaButton = text.querySelector('a');

      if (ctaButton) {
        ctaButton.classList.add('button', 'large');
        ctaButton.closest('p').replaceWith(ctaButton);
      }
    } else {
      const ctaButtonList = text.querySelector('ul');
      ctaButtonList.classList.add('cta-button-list');
      const ctaButtons = ctaButtonList.querySelectorAll('ul a');
      ctaButtons.forEach((btn) => {
        btn.classList.add('button', 'large', 'black-border');
      });
    }

    this.shadowRoot.querySelector('slot[name="picture"]').replaceWith(image);
    this.shadowRoot.querySelector('slot[name="text"]').replaceWith(...text.children);
  }
}

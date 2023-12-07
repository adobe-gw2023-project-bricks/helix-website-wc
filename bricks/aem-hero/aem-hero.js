import { HtmlTemplateBrick } from '../../scripts/aem.js';

// Best case this class can be empty, but if you need
// some additional processing that cannot be expressed
// with data-aem-selector, this is the place
export default class Hero extends HtmlTemplateBrick {
  prepareContent() {
    this.innerContent = document.createElement('aem-hero-prepare-content');
    const h1 = this.querySelector("h1");
    if(h1) {
      Array.from(h1.parentElement.children).forEach(e => this.innerContent.append(e));
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // set inner content
    const ic = this.root.querySelector('.inner-content');
    if (ic) {
      Array.from(this.innerContent.children).forEach(e => ic.append(e));
      delete this.innerContent;
    }

    // setup "button"
    this.root.querySelector('a')?.classList.add('button', 'primary', 'large');
  }
}

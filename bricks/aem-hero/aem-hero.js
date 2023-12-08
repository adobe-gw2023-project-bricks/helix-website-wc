import HtmlTemplateBrick from '../../scripts/html-template-brick.js';

// Best case this class can be empty, but if you need
// some additional processing that cannot be expressed
// with data-aem-selector, this is the place
export default class Hero extends HtmlTemplateBrick {
  /** Inject content that cannot be easily expressed by CSS selectors */
  injectMoreContent(newContent) {
    const h1 = this.querySelector('h1');
    if (h1) {
      const ic = newContent.querySelector('.inner-content');
      Array.from(h1.parentElement.children).forEach((e) => ic.append(e));
    }
  }

  /** Needed to add button classes */
  connectedCallback() {
    super.connectedCallback();

    // setup our "button"
    this.root.querySelector('a')?.classList.add('button', 'primary', 'large');
  }
}

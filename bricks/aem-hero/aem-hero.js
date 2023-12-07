import { HtmlTemplateBrick } from '../../scripts/aem.js';

// Best case this class can be empty, but if you need
// some additional processing (like here) it can happen
// in connectedCallback()
export default class Hero extends HtmlTemplateBrick {
  connectedCallback() {
    super.connectedCallback();
    const root = this.shadowRoot ? this.shadowRoot : this;
    root.querySelector('a')?.classList.add('button', 'primary', 'large');
  }
}

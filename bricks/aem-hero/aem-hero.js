import { HtmlTemplateBrick } from '../../scripts/aem.js';

export default class Hero extends HtmlTemplateBrick {
  // Best case the class can be empty, but if you need
  // some additional processing like here it can happen
  // in connectedCallback()
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('a')?.classList.add('button', 'primary', 'large');
  }
}

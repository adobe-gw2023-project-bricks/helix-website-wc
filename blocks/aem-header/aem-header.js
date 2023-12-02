import { Block } from '../../scripts/aem.js';

export default class Header extends Block {
  constructor() {
    super();

    this.render();
  }

  async render() {
    const res = await fetch('/nav.plain.html');

    const [brand, sections, tools] = [
      ...Object.assign(document.createElement('div'), {
        innerHTML: await res.text(),
      }).children,
    ];

    brand.setAttribute('slot', 'brand');
    sections.setAttribute('slot', 'sections');
    tools.setAttribute('slot', 'tools');

    this.appendChild(brand);
    this.appendChild(sections);
    this.appendChild(tools);
  }
}

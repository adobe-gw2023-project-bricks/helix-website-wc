import { Brick } from '../../scripts/aem.js';

export default class Root extends Brick {
  async connectedCallback() {
    // Main Sections
    const main = this.shadowRoot.querySelector('slot[name="main"]');
    main.innerHTML = this.root.querySelector('main').innerHTML;

    // Decorate Sections
    main.querySelectorAll(':scope > div').forEach((section) => {
      const wrappers = [];

      let defaultContent = false;

      [...section.children].forEach((e) => {
        if (e.tagName === 'DIV' || !defaultContent) {
          const wrapper = document.createElement('div');
          wrappers.push(wrapper);
          defaultContent = e.tagName !== 'DIV';
          if (defaultContent) wrapper.classList.add('default-content-wrapper');
        }

        wrappers[wrappers.length - 1].append(e);
      });

      wrappers.forEach((wrapper) => section.append(wrapper));
      section.classList.add('section');
    });
  }
}

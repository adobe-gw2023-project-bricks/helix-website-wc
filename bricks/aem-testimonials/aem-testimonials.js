// eslint-disable-next-line max-classes-per-file
import { Brick, loadTemplate } from '../../scripts/aem.js';

class Component extends HTMLElement {
  constructor(templateName) {
    super();
    const template = document.getElementById(templateName);
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

export default class Header extends Brick {
  constructor() {
    super();
    this.render();
  }

  async render() {
    await Promise.all([
      loadTemplate('/bricks/aem-testimonials/aem-testimonial-slide.html', 'testimonial-slide'),
      loadTemplate('/bricks/aem-testimonials/aem-testimonial-tablist.html', 'testimonial-tablist'),
    ]);

    customElements.define(
      'testimonial-slide',
      class extends Component {
        constructor() {
          super('testimonial-slide');
        }
      },
    );
    customElements.define(
      'testimonial-tablist',
      class extends Component {
        constructor() {
          super('testimonial-tablist');
        }
      },
    );

    function slotElement(item, slot) {
      item.setAttribute('slot', slot);
      return item.outerHTML;
    }

    this.root.querySelectorAll(':scope > div').forEach((item) => {
      const siteLink = slotElement(item.querySelector(':scope > div:nth-child(3) > p:last-of-type'), 'site-link');
      const text = slotElement(item.querySelector(':scope > div:nth-child(3) > p'), 'testimonial-quote');

      const stats = [...item.querySelectorAll('ul > li')]
        .map((li) => slotElement(li, 'testimonial-stats')).join('');

      const titles = [...item.querySelectorAll(':scope > div:nth-child(3) > p')]
        .filter((p) => p.childElementCount === 0)
        .map((p) => slotElement(p, 'titles')).join('');

      console.log(item.innerHTML);
      this.append(document.createRange().createContextualFragment(`
        <testimonial-tablist slot="tablist">
          
        </testimonial-tablist>
        <testimonial-slide slot="slides">
          <picture slot="side-image">${item.querySelectorAll('picture')[1].innerHTML}</picture>
          ${siteLink}
          ${text}
          ${stats}
          ${titles}
        </testimonial-slide>
      `));
    });
  }
}

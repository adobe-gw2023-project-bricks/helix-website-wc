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

customElements.define(
  'testimonial-slide',
  class extends Component {
    constructor() {
      super('testimonial-slide');
      if (this.getAttribute('active') === 'true') {
        this.shadowRoot.querySelector('.tabpanel').classList.add('active');
      }
    }
  },
);
customElements.define(
  'testimonial-tab',
  class extends Component {
    constructor() {
      super('testimonial-tab');
      this.shadowRoot.addEventListener('slotchange', (e) => {
        console.log(e.target);
      });
    }
  },
);

export default class Header extends Brick {
  constructor() {
    super();
    this.activeSlide = 0;
    this.render();
  }

  setActiveSlide(activeSlide) {
    this.activeSlide = parseInt(activeSlide, 10);
    this.render();
  }

  async render() {
    this.innerHTML = '';
    await Promise.all([
      loadTemplate('/bricks/aem-testimonials/aem-testimonial-slide.html', 'testimonial-slide'),
      loadTemplate('/bricks/aem-testimonials/aem-testimonial-tab.html', 'testimonial-tab'),
    ]);

    function slotElement(item, slot) {
      item.setAttribute('slot', slot);
      return item.outerHTML;
    }

    this.root.querySelectorAll(':scope > div').forEach((item, i) => {
      const siteLink = slotElement(item.querySelector(':scope > div:nth-child(3) > p:last-of-type'), 'site-link');
      const text = slotElement(item.querySelector(':scope > div:nth-child(3) > p'), 'testimonial-quote');

      const stats = [...item.querySelectorAll('ul > li')]
        .map((li) => slotElement(li, 'testimonial-stats')).join('');

      const titles = [...item.querySelectorAll(':scope > div:nth-child(3) > p')]
        .filter((p) => p.childElementCount === 0)
        .map((p) => slotElement(p, 'titles')).join('');

      const brandImage = slotElement([...item.querySelectorAll('picture')][0], 'brand-image');
      const siteImage = slotElement([...item.querySelectorAll('picture')][1], 'slide-image');
      const contactPersonImage = slotElement([...item.querySelectorAll('picture')][2], 'contact-image');

      this.append(document.createRange().createContextualFragment(`
        <testimonial-tab slot="tablist" index="${i}" active="${i === this.activeSlide}">
          ${brandImage}
        </testimonial-tab>
        <testimonial-slide slot="slides" active="${i === this.activeSlide}">
          <picture slot="side-image">${siteImage}</picture>
          ${siteLink}
          ${text}
          ${stats}
          ${titles}
        </testimonial-slide>
      `));
    });

    this.querySelectorAll('testimonial-tab').forEach((tab) => {
      tab.addEventListener('click', () => this.setActiveSlide(tab.getAttribute('index')));
    });
  }
}

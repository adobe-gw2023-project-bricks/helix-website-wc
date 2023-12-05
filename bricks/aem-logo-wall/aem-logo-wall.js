import { Brick } from '../../scripts/aem.js';

function createTag(tag, attributes, html) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement) {
      el.append(html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      el.setAttribute(key, attributes[key]);
    });
  }
  return el;
}

export default class LogoWall extends Brick {
  connectedCallback() {
    const items = [...this.root.children];
    const slot = this.shadowRoot.querySelector('slot');

    const titles = document.createElement('div');

    const logoWallList = document.createElement('ul');

    items.forEach((item) => {
      [...item.children].forEach((div) => {
        const title = div.querySelector('h1,h2,h3,h4,h5,h6');
        const picture = div.querySelector('picture');
        const svg = div.querySelector('a[href$=".svg"]');
        const listItem = document.createElement('li');

        if (title) {
          titles.append(title);
        } else if (svg) {
          const svgHref = new URL(svg.href).pathname;
          const linkEl = div.querySelectorAll('a')[1];

          const svgEl = createTag('img', {
            src: svgHref,
            alt: linkEl.textContent,
            class: 'logo-wall-item-svg',
          });

          if (linkEl) {
            const svgLink = createTag('a', {
              href: linkEl.href,
              title: linkEl.title,
              target: '_blank',
              class: 'logo-wall-item-link',
              'aria-label': linkEl.textContent,
            }, svgEl);

            listItem.append(svgLink);
            logoWallList.append(listItem);
          }
        } else if (picture) {
          const linkEl = div.querySelector('a');
          if (linkEl) {
            const pictureLink = createTag('a', {
              href: linkEl.href,
              title: linkEl.title,
              target: '_blank',
              'aria-label': linkEl.textContent,
            }, picture);

            listItem.append(pictureLink);
          }

          logoWallList.append(listItem);
        }
      });
    });

    slot.append(titles, logoWallList);
  }
}

import { Brick } from '../../scripts/aem.js';

function addBlockLevelInViewAnimation(main) {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // support block level animation as well
  const inviewTriggerClassList = '.fade-up, .fade-in, .fade-left, .fade-right';
  main.querySelectorAll(inviewTriggerClassList).forEach((section) => {
    observer.observe(section);
  });
}

export default class Root extends Brick {
  async connectedCallback() {
    // Main Sections
    const main = this.shadowRoot.querySelector('main');
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

    addBlockLevelInViewAnimation(main);

    // Set up MutationObserver to detect changes in child node
    this.observer = new MutationObserver((event) => {
      event.forEach((mutation) => {
        mutation.addedNodes?.forEach((node) => {
          node.querySelectorAll?.('.icon:not([data-decorated])').forEach(Root.decorateIcons);
          node.querySelectorAll?.('a:not([data-decorated])').forEach(Root.decorateButton);
        });
      });
    });

    this.observer.observe(this.shadowRoot, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  static decorateIcons(elem) {
    if (elem.dataset.decorated) return;

    const iconName = Array.from(elem.classList)
      .find((c) => c.startsWith('icon-'))
      .substring(5);

    const img = document.createElement('img');
    img.dataset.iconName = iconName;
    img.src = `${window.hlx.codeBasePath}/icons/${iconName}.svg`;
    img.loading = 'lazy';
    elem.append(img);
    elem.dataset.decorated = true;
  }

  static decorateButton(elem) {
    if (elem.dataset.decorated) return;

    elem.title = elem.title || elem.textContent;

    if (elem.href !== elem.textContent) {
      const up = elem.parentElement;
      const twoup = elem.parentElement.parentElement;

      if (elem.querySelector('img')) return;

      if (
        up.childNodes.length === 1
        && up.tagName === 'STRONG'
        && twoup.childNodes.length === 1
        && twoup.tagName === 'P'
      ) {
        elem.className = 'button primary';
      }

      if (
        up.childNodes.length === 1
        && up.tagName === 'EM'
        && twoup.childNodes.length === 1
        && twoup.tagName === 'P'
      ) {
        elem.className = 'button secondary';
      }

      elem.dataset.decorated = true;
    }
  }
}

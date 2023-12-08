import { Brick } from '../../scripts/aem.js';

function addBlockLevelInViewAnimation(main) {
  const observerOptions = {
    threshold: 0.1, // add `.in-view` class when is 20% in view
    // rootMargin: '-10px 0px -10px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('intersecting?', entry.target);
      if (entry.isIntersecting) {
        console.log('entry in view', entry.target);
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // support block level animation as well
  const inviewTriggerClassList = '.fade-up, .fade-in, .fade-left, .fade-right';
  main.querySelectorAll(inviewTriggerClassList).forEach((section) => {
    console.log('section selected', section);
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
  }
}

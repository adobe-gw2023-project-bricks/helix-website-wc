export default class Tabs extends HTMLElement {
  static observedAttributes = ['active'];

  constructor() {
    super();

    this.innerHTML = /* html */ `
      <style>
        [data-tabs-content]:not([aria-selected="true"]) {
          display: none;
        }
      </style>
        
      ${this.innerHTML}
    `;

    this.tabLabels = this.querySelectorAll('[data-tabs-label]');
    this.tabContents = this.querySelectorAll('[data-tabs-content]');
  }

  connectedCallback() {
    this.tabLabels.forEach((tab, index) => {
      tab.setAttribute('data-index', index);
      tab.addEventListener('click', this.onTabClick.bind(this));
    });
  }

  onTabClick(e) {
    e.preventDefault();
    const active = e.currentTarget.dataset.index;
    this.setAttribute('active', active);
  }

  selectTab(selected) {
    [...this.tabLabels]?.forEach((tab, index) => {
      tab.setAttribute('aria-selected', Number(selected) === index);
    });

    [...this.tabContents]?.forEach((tab, index) => {
      tab.setAttribute('aria-selected', Number(selected) === index);
    });
  }

  attributeChangedCallback(name, prev, next) {
    if (prev === next) return;

    switch (name) {
      case 'active':
        this.selectTab(next);
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {
    this.querySelectorAll('aem-tab').forEach((tab) => {
      tab.removeEventListener('click', this.onTabClick.bind(this));
    });
  }
}

if (!customElements.get('aem-tabs')) {
  customElements.define('aem-tabs', Tabs);
}

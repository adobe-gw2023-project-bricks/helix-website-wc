/**
 * Simpler brick using data-aem-inject attributes in the
 * HTML template to select the content to inject in it.
 */
export default class HtmlTemplateBrick extends HTMLElement {
  static injectFromCSSSelector(scope, elem) {
    scope.querySelectorAll('*[data-aem-inject]')?.forEach((selector) => {
      elem.querySelectorAll(selector.dataset.aemInject).forEach((item) => {
        const src = item.cloneNode(true);

        // remove the attribute so we don't try to inject it again
        selector.removeAttribute('data-aem-inject');

        if (src) {
          // set loaded attribute
          selector.setAttribute('data-aem-inject-loaded', '');
          selector.append(src);
        }
      });
    });
  }

  static injectEachLoopFromCSSSelector(scope, elem) {
    scope.querySelectorAll('*[data-aem-each]').forEach((each) => {
      const parent = each.parentNode;

      elem.querySelectorAll(each.dataset.aemEach).forEach((item) => {
        const clone = each.cloneNode(true);

        // remove the attribute so we don't try to inject it again
        clone.removeAttribute('data-aem-each');

        each.remove();

        // Inject content from our template's CSS selectors
        HtmlTemplateBrick.injectFromCSSSelector(clone, item);

        // set loaded attribute
        clone.setAttribute('data-aem-each-loaded', '');

        parent.append(clone);
      });
    });
  }

  constructor() {
    super();

    const id = this.tagName.toLowerCase();
    const template = document.getElementById(id);
    if (template) {
      const newContent = template.content.cloneNode(true);

      // Inject content from interations from our template's CSS selectors
      HtmlTemplateBrick.injectEachLoopFromCSSSelector(newContent, this);

      // Inject content from our template's CSS selectors
      HtmlTemplateBrick.injectFromCSSSelector(newContent, this);

      // Let derived classes inject more content if needed
      if (typeof this.injectMoreContent === 'function') {
        this.injectMoreContent(newContent);
      }

      // Append content to shadow root or directly
      if (template.getAttribute('shadowroot') === 'true') {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(newContent);
        this.root = this.shadowRoot;
      } else {
        this.innerHTML = '';
        this.append(newContent);
        this.root = this;
      }
    }
  }
}

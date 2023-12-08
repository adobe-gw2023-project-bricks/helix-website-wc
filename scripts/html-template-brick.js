/**
 * Simpler brick using data-aem-selector attributes in the
 * HTML template to select the content to inject in it.
 */
export default class HtmlTemplateBrick extends HTMLElement {
  connectedCallback() {
    const id = this.tagName.toLowerCase();
    const template = document.getElementById(id);
    if (template) {
      const newContent = template.content.cloneNode(true);

      // Inject content from our template's CSS selectors
      newContent.querySelectorAll('*[data-aem-selector]').forEach((e) => {
        this.querySelectorAll(e.dataset.aemSelector)?.forEach((src) => e.append(src));
      });

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

import { Brick } from '../../scripts/aem.js';

function removeOuterElementLayer(element, targetSelector) {
  const targetElement = element.querySelector(targetSelector);
  if (targetElement) {
    const parent = targetElement.parentNode;
    if (parent) (parent).replaceWith(targetElement);
  }
}

function combineChildrenToSingleDiv(element) {
  const targetChildren = element.querySelectorAll(':scope > div');
  if (targetChildren.length === 0) { return; }

  const singleDiv = document.createElement('div');
  targetChildren.forEach((targetChild) => {
    const children = Array.from(targetChild.childNodes);
    children.forEach((childElement) => {
      singleDiv.appendChild(childElement);
    });
    targetChild.remove();
  });

  element.append(singleDiv);
}

const ColorIconPattern = ['pink', 'lightgreen', 'purple', 'yellow', 'purple', 'yellow', 'lightgreen', 'pink'];
const ColorNumberPattern = ['lightgreen', 'pink', 'purple', 'yellow'];
const getColorPatternIndex = (patternArray, currentIndex) => (currentIndex % patternArray.length);

export default class Columns extends Brick {
  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    const classes = ['one', 'two', 'three', 'four', 'five'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enter');
        }
      });
    });

    const row = this.root.children[0];
    if (row) {
      slot.classList.add(classes[row.children.length - 1]);
    }

    this.root.querySelectorAll(':scope > div > div').forEach((cell, index) => {
      if (!cell.previousElementSibling) cell.classList.add('columns-left');
      if (!cell.nextElementSibling) cell.classList.add('columns-right');

      const img = cell.querySelector('img');
      if (img) {
        cell.classList.add('columns-image');
        observer.observe(img);
        img.parentElement.closest('p').classList.add('image-wrapper-el');
      } else {
        cell.classList.add('columns-content');
        const wrapper = document.createElement('div');
        wrapper.className = 'columns-content-wrapper';
        while (cell.firstChild) wrapper.append(cell.firstChild);
        cell.append(wrapper);

        // colored icons
        removeOuterElementLayer(cell, '.icon');
        if (this.classList.contains('colored-icon')) {
          const colorIconPatternIndex = getColorPatternIndex(ColorIconPattern, index);
          cell.querySelector('.icon').classList.add('colored-tag', 'circle', colorIconPatternIndex);
        }
      }

      // colored number tag in cards
      if (this.classList.contains('colored-number')) {
        const colorNumberPatternIndex = getColorPatternIndex(ColorNumberPattern, index);
        cell.querySelector('h4')?.classList.add('colored-tag', 'number-tag', ColorNumberPattern[colorNumberPatternIndex]);
      }
    });

    if (this.classList.contains('single-grid')) {
      combineChildrenToSingleDiv(this.root);
    }

    if (this.classList.contains('inview-animation')) {
      /* TODO animation:
      addInViewAnimationToMultipleElements(
        animationConfig.items,
        block,
        animationConfig.staggerTime
      );
      */
    }

    slot.append(...this.root.children);
  }
}

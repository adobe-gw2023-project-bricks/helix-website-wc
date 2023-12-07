import { Brick } from '../../scripts/aem.js';

export default class RoiCalculator extends Brick {
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        const title = this.root.querySelector('h2');
        if (title) slot.append(title);
        const button = this.root.querySelector('a');
        if (button) {
            button.classList.add('button', 'primary', 'large');
            const buttonWrapper = document.createElement('p');
            buttonWrapper.append(button);
            slot.append(buttonWrapper);
        }
    }
}
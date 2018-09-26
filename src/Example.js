// @flow

export default class Example {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  init() {
    const button = this.element.getElementsByTagName('button')[0];
    const form = this.element.getElementsByTagName('form')[0];
    const func = () => form.submit();
    if (button !== undefined) {
      button.onclick = func;
    }
  }
}

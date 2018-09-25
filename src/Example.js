// @flow

export default class Example {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  init() {
    this.element.classList.add('jumbotron');

    const h = document.createElement('h1');
    h.classList.add('display-4');
    const hcontent = document.createTextNode('Hello, world!');
    h.appendChild(hcontent);
    this.element.appendChild(h);

    const p = document.createElement('p');
    p.classList.add('lead');
    const pcontent = document.createTextNode('This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.');
    p.appendChild(pcontent);
    this.element.appendChild(p);

    const a = document.createElement('a');
    a.classList.add('btn', 'btn-primary', 'btn-lg');
    a.href = '#';
    a.setAttribute('role', 'button');
    const acontent = document.createTextNode('Learn more');
    a.appendChild(acontent);
    this.element.appendChild(a);
  }
}

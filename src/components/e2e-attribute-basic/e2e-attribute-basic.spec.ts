import { TestWindow } from '@stencil/core/testing';
import { AttributeBasic } from './e2e-attribute-basic';

describe('e2e-attribute-basic', () => {
  it('should build', () => {
    expect(new AttributeBasic()).toBeTruthy();
  });
});

// jest
describe('attributes', () => {
  it('should set props from attributes', async () => {
    const expectedResult = `<div id="data-aa"><div class="single">Single</div><div class="multiWord">Multi Word</div><div class="customAttr">My Custom Attr</div></div>`;
    const window = new TestWindow();
    const element: HTMLUnknownElement = await window.load({
      components: [AttributeBasic],
      html:
        '<e2e-attribute-basic single="Single" multi-word="Multi Word" my-custom-attr = "My Custom Attr"  ></e2e-attribute-basic>',
    });
    // console.log(element.textContent);
    // console.log(element.innerHTML);
    // console.log(element.innerText);

    expect(element.innerHTML).toEqual(expectedResult);
  });
});

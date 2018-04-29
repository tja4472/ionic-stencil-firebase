import { TestWindow } from '@stencil/core/testing';
import { ModalForm } from './tjaexa-modal-form';

describe('app', () => {
  it('should build', () => {
    expect(new ModalForm()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLUnknownElement;

    beforeEach(async () => {
      const window = new TestWindow();
      // element: HTMLUnknownElement
      element = await window.load({
        components: [ModalForm],
        html: '<tjaexa-modal-form></tjaexa-modal-form>'
      });
    });

    it('should not render any content if there is not a match', async () => {
      // console.log('element.innerHtml>', element.innerHTML);
      // debugger;
      // await flush(element);
      
      const pElement = element.querySelector('ion-title'); 
      // console.log('pElement.innerHtml>', pElement.innerHTML);
      // console.log('pElement.textContent>', pElement.textContent);            
      expect(pElement.textContent).toEqual('Modal Form');     
    })    
  });
});
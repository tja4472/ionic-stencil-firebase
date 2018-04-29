import { render } from '@stencil/core/testing';
import { ShowModal } from './tjaexa-show-modal';

describe('app', () => {
  it('should build', () => {
    expect(new ShowModal()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [ShowModal],
        html: '<app-home></app-home>'
      });
    });
  });
});
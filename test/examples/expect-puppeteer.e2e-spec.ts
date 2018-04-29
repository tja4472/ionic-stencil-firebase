import { Browser, Page } from 'puppeteer';

// declare const browser: Browser;
// declare var page: Page;

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/expect-puppeteer/index.d.ts

type ExpectPolling = number | 'mutation' | 'raf';

/**
 * Configures how to poll for an element.
 */
interface ExpectTimingActions {
  /**
   * An interval at which the pageFunction is executed. Defaults to "raf".
   */
  polling?: ExpectPolling;

  /**
   * Maximum time to wait for in milliseconds. Defaults to 500.
   */
  timeout?: number;
}

interface ExpectToClickOptions extends ExpectTimingActions {
  /**
   * A text or a RegExp to match in element textContent.
   */
  text?: string | RegExp;
}
declare global {
  namespace jest {
    // tslint:disable-next-line no-empty-interface
    interface Matchers<R> {
      // These must all match the ExpectPuppeteer interface above.
      // We can't extend from it directly because some method names conflict in type-incompatible ways.
      toClick(selector: string, options?: ExpectToClickOptions): Promise<void>;
      toDisplayDialog(block: () => Promise<void>): Promise<void>;
      toFill(
        selector: string,
        value: string,
        options?: ExpectTimingActions,
      ): Promise<void>;
      toMatch(selector: string, options?: ExpectTimingActions): Promise<void>;
      // toMatchElement(selector: string, value: string, options?: ExpectTimingActions): Promise<void>;
      toMatchElement(
        selector: string,
        options?: ExpectToClickOptions,
      ): Promise<void>;
      toSelect(
        selector: string,
        valueOrText: string,
        options?: ExpectTimingActions,
      ): Promise<void>;
      toUploadFile(
        selector: string,
        filePath: string,
        options?: ExpectTimingActions,
      ): Promise<void>;
    }
  }
}

describe('expect-puppeteer tests', () => {
  beforeAll(async () => {
    // page = await browser.newPage();
    await page.goto('http://localhost:3335');
    await page.waitForSelector('ion-button');
    await page.waitFor(1000); // Wait for animations to finish.    
  });

  it('toClick', async () => {
    await expect(page).toClick('ion-button');
  });
/*
  it('toClick - text', async () => {
    const ggg = await page.evaluate(
      () => document.querySelector('ion-button').textContent,
    );
    console.log('ggg>', ggg);

    const testElementA = await page.$eval('ion-button', (el) => el.textContent);
    console.log('testElementA>', testElementA);

    await expect(page).toClick('ion-button', { text: 'Show Modal Page' });
  });
*/
  it('toMatch', async () => {
    await expect(page).toMatch('Ionic PWA Toolkit');
  });

  it('toMatch - timeout', async () => {
    await expect(page).toMatch('Ionic PWA Toolkit', { timeout: 1000 });
  });

  it('toMatchElement', async () => {
    await expect(page).toMatchElement('e2e-attribute-basic .single', {
      text: 'Single',
    });
  });
});

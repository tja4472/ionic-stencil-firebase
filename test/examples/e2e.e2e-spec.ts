// import { Browser, Page } from 'puppeteer';

// declare const browser: Browser;
// declare var page: Page;

// Force typescript to treat as module.
export {};

const appUrlBase = 'http://localhost:3335';

const routes = {
  public: {
    root: appUrlBase,
    // register: `${appUrlBase}/register`,
    // login: `${appUrlBase}/login`,
    // noMatch: `${appUrlBase}/asdf`,
  },
  private: {
    // events: appUrlBase,
    // alerts: `${appUrlBase}/alerts`,
    // services: `${appUrlBase}/services`,
    // team: `${appUrlBase}/team`,
  },
  admin: {
    // templates: `${appUrlBase}/templates`,
  },
};

/*
afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close()
  }
})
*/

// https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/
describe('e2e tests', () => {
  beforeAll(async () => {
    await page.goto(routes.public.root);
    // page = await browser.newPage();
  });
/*
  it(
    'show modal form',
    async () => {
      const page = await browser.newPage();
      page.on('load', () => console.log('loaded!'));
      await page.goto(routes.public.root);
      await page.waitForSelector('[data-testid="showModalPageButton"]');

      await page.waitFor(1000); // Wait for animations to finish.
      await page.click('[data-testid="showModalPageButton"]');
      // await page.waitFor(300);
      //    console.log('BB');

      // await page.waitForNavigation({waitUntil:'domcontentloaded'});
      await page.waitForSelector('[data-testid="showModalFormButton"]');
      // console.log('BB1');
      // await page.waitFor(100);
      await page.waitFor(1000);
      await page.click('[data-testid="showModalFormButton"]');
      // console.log('CC');

      // await page.waitForSelector('tjaexa-modal-form');
      // await page.waitForSelector('[data-testid="modalForm"]');
      // console.log('CC1');
      await page.waitForSelector('[data-testid="modalFormCancelButton"]');
      await page.waitFor(1000);
      await page.click('[data-testid="modalFormCancelButton"]');
      // console.log('DD');
    },
    15 * 1000,
  );
*/
  /*    
    const testElementA = await page.$eval(
      '[data-testid="showModalPageButton"]',
      (el) => el.outerHTML,
    );
    console.log('testElementA>', testElementA);    
*/

  
  it('test1', async () => {
    // console.log('test1:A');
    // await page.goto('http://localhost:3335');    
    // console.log('test1:B');
    await page.waitForSelector('[data-testid="showModalPageButton"]');
    console.log('test1:C');    
    // await page.click('[data-testid="showModalPageButton"]');    
    console.log('test1:D');
  });

  it('test2', async () => {
    // console.log('test2');
    // await page.goto('http://localhost:3335');    
    // console.log('test2:B');    
    await page.waitForSelector('[data-testid="showModalPageButton"]');
    console.log('test2:C');    
    // await page.click('[data-testid="showModalPageButton"]');    
    console.log('test2:D');    
  });  

});

describe('BBBB', () => {
  beforeAll(async () => {
    await page.goto(routes.public.root);
    // page = await browser.newPage();
  });

  it('test1', async () => {
    // console.log('test1:A');
    // await page.goto('http://localhost:3335');    
    // console.log('test1:B');
    await page.waitForSelector('[data-testid="showModalPageButton"]');
    console.log('test1:C');    
    // await page.click('[data-testid="showModalPageButton"]');    
    console.log('test1:D');
  });  
});


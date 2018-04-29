// jest-puppeteer-preset; page setup and closed for each spec file.

describe('Puppeteer Tests - Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should display "google" text on page', async () => {
    // expect-puppeteer
    await expect(page).toMatch('google');
  });

  it('should load without error', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('google');
  });
});

describe('Puppeteer Tests - Ionic PWA Toolkit', () => {
  beforeAll(async () => {
    // page = await browser.newPage();
    await page.goto('http://localhost:3335');
    await page.waitForSelector('ion-button');
    await page.waitFor(300); // Wait for animations to finish.
  });

  it('should display "Ionic PWA Toolkit" text on page', async () => {
    // expect-puppeteer
    await expect(page).toMatch('Ionic PWA Toolkit');
  });

  it('page.evaluate', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Ionic PWA Toolkit');
  });

  it('page.title', async () => {
    const title = await page.title();
    expect(title).toContain('Ionic PWA Toolkit');
  });

  it('page.$eval - outerHTML', async () => {
    const outerHTML = await page.$eval(
      '[data-testid="showModalPageButton"]',
      (el) => el.outerHTML,
    );
    console.log('outerHTML>', outerHTML);
  });

  it('page.$eval - innerHTML', async () => {
    const innerHTML = await page.$eval(
      '[data-testid="showModalPageButton"]',
      (el) => el.innerHTML,
    );
    console.log('innerHTML>', innerHTML);
  });  

  it('page.$eval - textContent', async () => {
    const textContent = await page.$eval(
      '[data-testid="showModalPageButton"]',
      (el) => el.textContent,
    );
    console.log('textContent>', textContent);
    expect(textContent).toBe('Show Modal page');
  });   
});

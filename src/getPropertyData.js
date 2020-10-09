import puppeteer from 'puppeteer';

export default async function getProperty(propertyLink) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(propertyLink);

  const test = await page.content();
  const element = await page.$('script[type="application/ld+json"]');
  const content = await page.evaluate(
    (element) => element.textContent,
    element
  );
  const data = JSON.parse(content);
  const photos = data.photo.map((o) => o.contentUrl);
  await browser.close();
}

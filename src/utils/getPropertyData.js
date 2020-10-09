import puppeteer from 'puppeteer';

async function getDataFromPage(page, link) {
  const element = await page.$('script[type="application/ld+json"]');
  const content = await page.evaluate(
    (element) => element.textContent,
    element
  );
  const data = JSON.parse(content);
  const photos = data.photo.map((o) => o.contentUrl);
  return { photos, name: data.name, price: data.offers.price, url: link };
}

export default async function getProperties(links) {
  const browser = await puppeteer.launch({ headless: false });
  const data = await Promise.all(
    links.map(async (l) => {
      const page = await browser.newPage();
      await page.goto(l);
      return await getDataFromPage(page, l);
    })
  );

  browser.close();
  return data;
}

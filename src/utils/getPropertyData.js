import puppeteer from 'puppeteer';
// import chrome from 'chrome-aws-lambda';

async function getDataFromPage(page, link) {
  const dataElement = await page.$('script[type="application/ld+json"]');
  const dataContent = await page.evaluate(
    (element) => element.textContent,
    dataElement
  );
  const data = JSON.parse(dataContent);
  const photos = data.photo.map((o) => o.contentUrl);

  const mapElement = await page.$(
    'script[type="application/json"][data-object-map-config]'
  );
  const mapContent = await page.evaluate(
    (element) => element.textContent,
    mapElement
  );
  const mapData = JSON.parse(mapContent);
  return {
    photos,
    name: data.name,
    price: data.offers.price,
    url: link,
    lat: mapData.lat,
    lng: mapData.lng,
  };
}

export default async function getProperties(links) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
  });
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

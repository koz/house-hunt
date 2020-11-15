import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function getDataFromPage(page, link) {
  const statusElement = await page.$('script[type="application/ld+json"][data-advertisement-targeting]')
  const statusContent = await page.evaluate(
    (element) => element?.textContent,
    statusElement
  )

  const statusData = statusContent ? JSON.parse(statusContent) : null
  const status = statusData?.status || 'beschikbaar'

  // verhuurd pages are different from verhuurd onder voorbehoud ones
  const isVerhuurdPage = status === 'verhuurd'

  const dataElement = await page.$('script[type="application/ld+json"]:not([data-tracking-global-properties]):not([data-user-identify])');
  const dataContent = await page.evaluate(
    (element) => element?.textContent,
    dataElement
  );

  if (!dataContent) {
    return
  }

  const data = JSON.parse(dataContent);

  const name = !isVerhuurdPage ? data.name : data.itemListElement && data.itemListElement[data.itemListElement.length - 1]?.item?.name;
  const photos = await page.evaluate(() => Array.from(document.querySelectorAll('img[data-interaction="Object.Fotos"]')).map(el => el.getAttribute('data-lazy') ? el.getAttribute('data-lazy').replace('.jpg', 'x960.jpg') : el.getAttribute('src')))

  if(!name) {
    return null
  }

  const mapElement = await page.$(
    'script[type="application/json"][data-object-map-config]'
  );

  const mapContent = await page.evaluate(
    (element) => element?.textContent,
    mapElement
  );

  const mapData = mapContent ? JSON.parse(mapContent) : {};
  return {
    name,
    photos,
    price: data.offers?.price || statusData?.huurprijs,
    url: link,
    lat: mapData?.lat,
    lng: mapData?.lng,
    status
  };
}

export default async function getProperties(links) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });
  const data = await Promise.all(
    links.map(async (l) => {
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(l);
      return await getDataFromPage(page, l);
    })
  );

  browser.close();
  return data;
}

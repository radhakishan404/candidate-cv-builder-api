import puppeteer from "puppeteer";


export const createListenPdf = async (html, header, footer, filename) => {
  const browser = await puppeteer.launch({
    headless: true
  })

  // create a new page
  const page = await browser.newPage()

  // set your html as the pages content
  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  // or a .pdf file
  await page.pdf({
    format: 'A4',
    printBackground: true,
    headerTemplate: header,
    footerTemplate: footer,
    displayHeaderFooter: true,
    margin: { top: '2cm', bottom: '2cm' },
    path: `./public/${filename}.pdf`
  })

  // close the browser
  await browser.close()
}

import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from '../helpers';
import { headerSection } from '../reports/sections/header.section';
import { footerSection } from '../reports/sections/footer.section';
import { getCommunityReport } from '../reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('./src/reports/html/basic-03.html', 'utf8');

    const content = getHtmlContent(html, {
      client: 'Pablo'
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content,
    }

    return this.printerService.createPdf(docDefinition);
  }

  getCommunity() {
    const docDefinition = getCommunityReport();

    return this.printerService.createPdf(docDefinition);
  }

  getCustomSize() {
    return this.printerService.createPdf({
      // pageSize: 'TABLOID',
      pageSize: {
        width: 150,
        height: 350
      },
      content: [
        {
          qr: 'https://devtalles.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20]
        }
      ]
    })
  }
}

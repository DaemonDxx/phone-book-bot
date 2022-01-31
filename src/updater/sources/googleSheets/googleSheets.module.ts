import {
  DynamicModule,
  FactoryProvider,
  Module,
  Provider,
} from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ACTIVE_WORKBOOK_TOKEN } from './utils/constants';
import { ACTIVE_SOURCE_TOKEN } from '../../constants';
import { GoogleSheetsService } from './googleSheets.service';
import { GoogleSheetsSourceOption } from './import.function';

export type ModuleAsyncOption = Pick<FactoryProvider, 'inject'> & {
  useFactory: (...any) => GoogleSheetsSourceOption;
};
export const GOOGLE_SHEET_OPTION_TOKEN = 'GOOGLE_SHEET_OPTION_TOKEN';

@Module({})
export class GoogleSheetsSource {
  static forRootAsync(optionModule: ModuleAsyncOption): DynamicModule {
    return {
      module: GoogleSheetsSource,
      providers: [
        this.createOptionProvider(optionModule),
        {
          provide: ACTIVE_WORKBOOK_TOKEN,
          useFactory: async (option: GoogleSheetsSourceOption) => {
            try {
              const workbook = new GoogleSpreadsheet(option.workbookID);
              await workbook.useServiceAccountAuth(option.accountOption);
              await workbook.loadInfo();
              return workbook;
            } catch (e) {
              console.error(e);
              process.exit(-1);
            }
          },
          inject: [GOOGLE_SHEET_OPTION_TOKEN],
        },
        {
          provide: ACTIVE_SOURCE_TOKEN,
          useClass: GoogleSheetsService,
        },
      ],
      exports: [ACTIVE_SOURCE_TOKEN],
    };
  }

  private static createOptionProvider(option: ModuleAsyncOption): Provider {
    return {
      provide: GOOGLE_SHEET_OPTION_TOKEN,
      inject: option.inject,
      useFactory: option.useFactory,
    };
  }
}

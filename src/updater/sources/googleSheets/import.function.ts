import { GoogleSheetsSource, ModuleAsyncOption } from './googleSheets.module';
import { DynamicModule } from '@nestjs/common';
import { ServiceAccountCredentials } from 'google-spreadsheet';

export type GoogleSheetsSourceOption = {
  workbookID: string;
  accountOption: ServiceAccountCredentials;
};

export const ApplyGoogleSheetSource = (
  option: ModuleAsyncOption,
): DynamicModule => {
  return GoogleSheetsSource.forRootAsync(option);
};

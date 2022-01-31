import { Injectable } from '@nestjs/common';
import { DataSource } from '../../../types/updater/dataSource.interface';
import { InjectWorkbook } from './utils/workbook.inject.decorator';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Employee } from '../../../employee/employee.entity';

@Injectable()
export class GoogleSheetsService implements DataSource {
  @InjectWorkbook()
  private readonly wb: GoogleSpreadsheet;

  async extractData(): Promise<Employee[]> {
    try {
      const sheet = this.wb.sheetsByIndex[0];
      const rows = await sheet.getRows({
        limit: 0,
        offset: 1,
      });
      return rows.map((row) => {
        return GoogleSheetsService.getEmployeeFromRow(row);
      });
    } catch (e) {
      console.error(e.message, e.trace);
    }
  }

  private static getEmployeeFromRow(row: GoogleSpreadsheetRow): Employee {
    const employee = new Employee();
    for (const field in row) {
      if (GoogleSheetsService.isFieldModel(field)) {
        employee[field] = GoogleSheetsService.normalize(row[field]);
      }
    }
    return employee;
  }

  private static normalize(value: string): string {
    return value.trim();
  }

  private static isFieldModel(fieldname: string): boolean {
    const firstCharField = fieldname[0];
    return !(firstCharField === '_' || !firstCharField);
  }
}

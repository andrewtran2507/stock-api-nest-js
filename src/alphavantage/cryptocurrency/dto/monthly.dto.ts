import { DataType } from 'src/alphavantage/enum';

export type MonthlyDTO = {
  symbol: string;
  market: string;
  datatype?: DataType;
};

import { DataType } from 'src/alphavantage/enum';

export type DailyDTO = {
  symbol: string;
  market: string;
  datatype?: DataType;
};

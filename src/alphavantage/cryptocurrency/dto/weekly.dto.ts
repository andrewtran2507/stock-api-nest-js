import { DataType } from 'src/alphavantage/enum';

export type WeeklyDTO = {
  symbol: string;
  market: string;
  datatype?: DataType;
};

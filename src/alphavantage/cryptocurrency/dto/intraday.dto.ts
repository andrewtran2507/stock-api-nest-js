import { DataType, Interval, OutputSize } from 'src/alphavantage/enum';

export type IntradayDTO = {
  symbol: string;
  market: string;
  interval: Interval;
  outputsize?: OutputSize;
  datatype?: DataType;
};

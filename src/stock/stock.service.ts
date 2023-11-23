import { Injectable } from '@nestjs/common';
import { StockInput, TimeSeriesDataResult, ErrorType } from './stock.entity';
import * as eav from 'src/alphavantage/enum';
import { AlphaVantageRequestError } from 'src/alphavantage/errors';
import AlphaVantage from 'src/alphavantage';
import { ETFunctionType } from './type';

@Injectable()
export class StockService {
  constructor() {}
  async getTimeSeriesData({
    functionCode,
    symbols, // "IBM,TSLA,AAPL,VFS,FB"
    apikey,
    interval,
    adjusted,
    extended_hours,
    month,
    outputsize,
    datatype,
  }: StockInput): Promise<(typeof TimeSeriesDataResult)[] | ErrorType> {
    /// handle
    let functionName: string = 'stockTimeSeries'; // we can handle some another functionName later
    let functionType: string = '';

    if (!apikey) {
      return new AlphaVantageRequestError('Please input apikey!', '');
    }
    if (!functionCode) {
      return new AlphaVantageRequestError('Please inout function code!', '');
    }
    if (!symbols || !symbols?.includes(',')) {
      return new AlphaVantageRequestError('Please fill right symbols!', '');
    }

    const arrSymbols: string[] =
      symbols
        ?.split(',')
        ?.map((ticker: string) => ticker?.trim())
        ?.filter((ticker: string | null) => ticker) || [];
    if (arrSymbols.length === 0) {
      return new AlphaVantageRequestError('Please input your symbols!', '');
    }
    if (arrSymbols.length > 5) {
      // This is keep performance for this demo. We can update later.
      return new AlphaVantageRequestError(
        'Please fill your symbols less than six tickets code!',
        '',
      );
    }

    const avt = new AlphaVantage({ apikey: apikey });

    switch (functionCode) {
      case eav.Function.TIME_SERIES_INTRADAY:
        functionType = ETFunctionType.intraday;
        break;
      case eav.Function.TIME_SERIES_DAILY:
        functionType = ETFunctionType.daily;
        break;
      case eav.Function.TIME_SERIES_DAILY_ADJUSTED:
        functionType = ETFunctionType.dailyAdjusted;
        break;
      case eav.Function.TIME_SERIES_WEEKLY:
        functionType = ETFunctionType.weekly;
        break;
      case eav.Function.TIME_SERIES_WEEKLY_ADJUSTED:
        functionType = ETFunctionType.weeklyAdjusted;
        break;
      case eav.Function.TIME_SERIES_MONTHLY:
        functionType = ETFunctionType.monthly;
        break;
      case eav.Function.TIME_SERIES_MONTHLY_ADJUSTED:
        functionType = ETFunctionType.monthlyAdjusted;
        break;
      case eav.Function.SYMBOL_SEARCH:
        functionType = ETFunctionType.search;
        break;
      case eav.Function.GLOBAL_QUOTE:
        functionType = ETFunctionType.quote;
        break;
      /// we can handle some another case later
      default:
        functionName = '';
        functionType = '';
        break;
    }

    if (!functionName || !functionType) {
      return new AlphaVantageRequestError(
        'Please fill right function code!',
        '',
      );
    }

    const objParam: {
      interval?: string;
      adjusted?: boolean;
      extended_hours?: boolean;
      month?: string;
      outputsize?: string;
      datatype?: string;
    } = {
      interval,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    };

    const results: (typeof TimeSeriesDataResult)[] = await Promise.all(
      arrSymbols.map(async (ticker: string) => {
        return await avt[functionName][functionType]({
          symbol: ticker,
          ...objParam,
        });
      }),
    );
    return results;
  }
}

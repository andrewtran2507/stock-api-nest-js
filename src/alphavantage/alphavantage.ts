import axios from 'axios';
import { StockTimeSeries } from './stock-time-series/StockTimeSeries';
import { FundamentalData } from './fundamental-data/FundamentalData';
import { Cryptocurrency } from './cryptocurrency/Cryptocurrency';
import { ConfigService } from '@nestjs/config';

export type Config = {
  apikey: string;
};

export class AlphaVantage {
  stockTimeSeries: StockTimeSeries;
  fundamentalData: FundamentalData;
  cryptocurrency: Cryptocurrency;

  constructor({ apikey }: Config) {
    const configService = new ConfigService();
    const api = axios.create({
      baseURL: configService.get('API_AV_URL'),
      params: { apikey },
    });

    this.stockTimeSeries = new StockTimeSeries(api);
    this.fundamentalData = new FundamentalData(api);
    this.cryptocurrency = new Cryptocurrency(api);
  }
}

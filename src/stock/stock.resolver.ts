import { StockService } from './stock.service';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ErrorType, TimeSeriesDataResult } from './stock.entity';

@Resolver(() => [TimeSeriesDataResult])
export class StockResolver {
  constructor(@Inject(StockService) private stockService: StockService) {}

  @Query(() => [TimeSeriesDataResult])
  async getTimeSeriesData(
    @Args('functionCode') functionCode: string,
    @Args('symbols') symbols: string,
    @Args('apikey') apikey: string,
    @Args('interval') interval?: string,
    @Args('adjusted') adjusted: boolean = true,
    @Args('extended_hours') extended_hours: boolean = true,
    @Args('month') month?: string,
    @Args('outputsize') outputsize: string = 'compact',
    @Args('datatype') datatype: string = 'json',
  ): Promise<(typeof TimeSeriesDataResult)[] | ErrorType> {
    return await this.stockService.getTimeSeriesData({
      functionCode,
      symbols,
      apikey,
      interval,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    });
  }
}

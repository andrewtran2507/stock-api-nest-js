import { ObjectType, Field, createUnionType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { CustomError } from 'src/alphavantage/errors';
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
class DailyMetadata {
  @Field()
  information: string;

  @Field()
  symbol: string;

  @Field()
  lastRefreshed: string;

  @Field()
  outputSize: string;

  @Field()
  timeZone: string;
}

/// TimeSeriesIntraDayResponse
@ObjectType()
class IntraDayMetadata extends DailyMetadata {
  @Field()
  interval: string;
}

@ObjectType()
export class StockInput {
  @Field(() => String)
  functionCode: string;

  @Field(() => String)
  symbols: string; // MIS,TLS,IBM

  @Field(() => String)
  apikey: string;

  @Field(() => String, { nullable: true })
  interval?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  adjusted?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  extended_hours?: boolean;

  @Field(() => String, { nullable: true })
  month?: string;

  @Field(() => String, { nullable: true, defaultValue: 'compact' })
  outputsize?: string;

  @Field(() => String, { nullable: true, defaultValue: 'json' })
  datatype?: string;
}

@ObjectType()
export class TimeSeriesIntraDayResponse {
  @Field()
  metadata: IntraDayMetadata;

  @Field(() => GraphQLJSON)
  timeSeries: JSON;
}

@ObjectType()
export class TimeSeriesDailyResponse {
  @Field()
  metadata: DailyMetadata;

  @Field(() => GraphQLJSON)
  timeSeries: JSON;
}

@ObjectType()
class SearchResponse {
  @Field()
  symbol: string;
  @Field()
  name: string;
  @Field()
  type: string;
  @Field()
  region: string;
  @Field()
  timezone: string;
  @Field()
  currency: string;
  @Field()
  matchScore: string;
  @Field()
  marketOpen: string;
  @Field()
  marketClose: string;
}

@ObjectType()
class QuoteResponse {
  @Field()
  symbol: string;
  @Field()
  high: string;
  @Field()
  low: string;
  @Field()
  volume: string;
  @Field()
  open: string;
  @Field()
  price: string;
  @Field()
  latestTradingDay: string;
  @Field()
  previousClose: string;
  @Field()
  change: string;
  @Field()
  changePercent: string;
}

@ObjectType()
export class TimeSeriesSearchResponse {
  @Field(() => [SearchResponse])
  bestMatches: SearchResponse[];
}

@ObjectType()
export class TimeSeriesQuoteResponse {
  @Field()
  quote: QuoteResponse;
}

export const TimeSeriesDataResult = createUnionType({
  name: 'TimeSeriesDataResult',
  types: () =>
    [
      TimeSeriesIntraDayResponse,
      TimeSeriesDailyResponse,
      TimeSeriesSearchResponse,
      TimeSeriesQuoteResponse,
      ErrorType,
    ] as const,
  resolveType(value) {
    if (value?.metadata?.interval) {
      return TimeSeriesIntraDayResponse;
    }
    if (!value?.metadata?.interval) {
      return TimeSeriesDailyResponse;
    }
    if (!value?.metadata && value?.bestMatches?.length) {
      return TimeSeriesSearchResponse;
    }
    if (!value?.metadata && value?.quote) {
      return TimeSeriesQuoteResponse;
    }
    return ErrorType;
  },
});

@ObjectType()
export class ErrorType extends CustomError {
  @Field()
  message: string;
}

@ObjectType()
@Entity()
export class Stock {
  @Field()
  @PrimaryKey({ type: 'uuid', onCreate: () => v4() })
  id: string;
}

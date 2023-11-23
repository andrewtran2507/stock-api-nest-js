import { ListingState } from 'src/alphavantage/enum';

export type ListingStatusDTO = {
  date?: string;
  state?: ListingState;
};

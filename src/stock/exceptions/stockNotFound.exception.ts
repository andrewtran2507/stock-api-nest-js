import { NotFoundException } from '@nestjs/common';

class StockNotFoundException extends NotFoundException {
  constructor(stockId: string) {
    super(`Stock with id ${stockId} not found`);
  }
}

export default StockNotFoundException;

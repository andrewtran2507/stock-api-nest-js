import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';

@Module({
  // imports: [MikroOrmModule.forFeature({ entities: [] })],
  providers: [StockService, StockResolver],
  exports: [StockService],
})
export class StockModule {}

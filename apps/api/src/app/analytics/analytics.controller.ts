import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('heatmap')
  getHeatmap() {
    return this.analyticsService.getIncidentHeatmap();
  }

  @Get('performance')
  getPerformance() {
    return this.analyticsService.getPerformanceMetrics();
  }
}

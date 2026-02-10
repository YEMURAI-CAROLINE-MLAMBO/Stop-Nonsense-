import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccessCoordinationService {
  private readonly logger = new Logger(AccessCoordinationService.name);

  // Simulates LLM-driven communication with a gate guard or neighbor
  async coordinateAccess(incidentId: string, address: string, contactType: string) {
    this.logger.log(`AI initiating access coordination for incident ${incidentId}...`);

    const messages = [
      { sender: 'AI Agent', text: `Emergency detected at ${address}. A responder is 2 minutes away. Please facilitate immediate access.` },
      { sender: contactType, text: 'Understood. Is the resident safe?' },
      { sender: 'AI Agent', text: 'Responder is dispatched. I will update you the moment they arrive at the gate. Please ensure the intercom is bypassed.' },
      { sender: contactType, text: 'Okay, gate is set to manual open. Standing by.' },
    ];

    return {
      status: 'Access Guaranteed',
      log: messages,
      estimatedPathClear: true,
    };
  }

  // Analyzes user onboarding data to determine the best AI coordination strategy
  async determineAccessStrategy(userProfile: any) {
    const strategy = userProfile.accessType === 'Complex'
      ? 'Automated Guard Notification + Neighbor Alert'
      : 'Direct Intercom Bypass via IoT/Voice';

    return {
      strategy,
      confidence: 0.98,
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { DispatchService } from './dispatch.service';
import { PrismaService } from '@instant-guard/database';
import { IncidentStatus } from '@instant-guard/types';

describe('DispatchService', () => {
  let service: DispatchService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    incident: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DispatchService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DispatchService>(DispatchService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an incident', async () => {
    const userId = 'user-1';
    const mockUser = { id: userId, accessMethod: 'OPEN_STREET', accessContacts: [] };
    mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
    mockPrismaService.incident.create.mockResolvedValue({ id: 'inc-1', status: 'DISPATCHING' });

    const result = await service.createIncident(userId, -26.1, 28.0, '123 Street');

    expect(result).toBeDefined();
    expect(mockPrismaService.incident.create).toHaveBeenCalled();
  });
});

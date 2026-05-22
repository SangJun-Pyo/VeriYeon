import type { ChainLog } from '../types';

function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function createMockHash(eventType: ChainLog['eventType']): ChainLog {
  return {
    id: `log-${Date.now()}`,
    eventType,
    txHash: generateTxHash(),
    createdAt: new Date().toISOString(),
  };
}

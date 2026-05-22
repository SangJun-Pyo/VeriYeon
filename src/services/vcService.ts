import type { VerifiableCredential } from '../types';
import { mockVCs } from '../data/mockVCs';

export async function getMockVCs(): Promise<VerifiableCredential[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockVCs;
}

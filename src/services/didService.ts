export type DIDObject = {
  did: string;
  method: string;
  network: string;
  createdAt: string;
};

export async function mockDidLogin(): Promise<DIDObject> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    did: `did:omnichain:${Math.random().toString(36).substring(2, 18)}`,
    method: 'omnichain',
    network: 'OmniOne Chain Testnet',
    createdAt: new Date().toISOString(),
  };
}

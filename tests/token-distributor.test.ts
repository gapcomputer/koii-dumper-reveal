import { describe, it, expect } from 'vitest';
import { TokenDistributor } from '../src/token-minting/token-distributor';

describe('TokenDistributor', () => {
  const tokenDistributor = new TokenDistributor();
  const mockWalletAddress = '0x1234567890123456789012345678901234567890';

  it('should distribute tokens for a valid wallet address', async () => {
    await expect(tokenDistributor.distributeTokens(mockWalletAddress, 10)).resolves.not.toThrow();
  });

  it('should throw an error for an invalid wallet address', async () => {
    await expect(tokenDistributor.distributeTokens('', 10)).rejects.toThrow('Invalid wallet address');
    await expect(tokenDistributor.distributeTokens(null as any, 10)).rejects.toThrow('Invalid wallet address');
  });

  it('should throw an error for non-positive token amounts', async () => {
    await expect(tokenDistributor.distributeTokens(mockWalletAddress, 0)).rejects.toThrow('Token amount must be positive');
    await expect(tokenDistributor.distributeTokens(mockWalletAddress, -5)).rejects.toThrow('Token amount must be positive');
  });
});
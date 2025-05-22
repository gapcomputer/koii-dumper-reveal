import { describe, it, expect, vi } from 'vitest';
import { TokenMinter } from '../src/token-minting/token-minter';
import { WalletAnalyzer } from '../src/token-minting/wallet-analyzer';
import { TokenDistributor } from '../src/token-minting/token-distributor';

describe('TokenMinter', () => {
  const mockWalletAddress = '0x1234567890123456789012345678901234567890';

  it('should generate tokens for a valid wallet address', async () => {
    const mockAnalyzer = {
      calculateDumpingScore: vi.fn().mockResolvedValue(0.5)
    } as unknown as WalletAnalyzer;

    const mockDistributor = {
      distributeTokens: vi.fn().mockResolvedValue(undefined)
    } as unknown as TokenDistributor;

    const tokenMinter = new TokenMinter(mockAnalyzer, mockDistributor);
    const tokens = await tokenMinter.generateTokens(mockWalletAddress);

    expect(tokens).toBeGreaterThan(10);
    expect(tokens).toBeLessThanOrEqual(50);
  });

  it('should throw an error for an invalid wallet address', async () => {
    const tokenMinter = new TokenMinter();
    
    await expect(tokenMinter.generateTokens('')).rejects.toThrow('Invalid wallet address');
    await expect(tokenMinter.generateTokens(null as any)).rejects.toThrow('Invalid wallet address');
  });
});
import { describe, it, expect } from 'vitest';
import { WalletAnalyzer } from '../src/token-minting/wallet-analyzer';

describe('WalletAnalyzer', () => {
  const walletAnalyzer = new WalletAnalyzer();
  const mockWalletAddress = '0x1234567890123456789012345678901234567890';

  it('should calculate dumping score for a valid wallet address', async () => {
    const score = await walletAnalyzer.calculateDumpingScore(mockWalletAddress);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it('should throw an error for an invalid wallet address', async () => {
    await expect(walletAnalyzer.calculateDumpingScore('')).rejects.toThrow('Invalid wallet address');
    await expect(walletAnalyzer.calculateDumpingScore(null as any)).rejects.toThrow('Invalid wallet address');
  });
});
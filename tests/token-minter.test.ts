import { describe, it, expect, beforeEach } from 'vitest';
import { TokenMinter } from '../src/token-minting/token-minter';

describe('TokenMinter', () => {
  const defaultConfig = {
    minDumpThreshold: 100,
    mintRatio: 0.1,
    maxMintPerWallet: 1000
  };

  let tokenMinter: TokenMinter;

  beforeEach(() => {
    tokenMinter = new TokenMinter(defaultConfig);
  });

  it('should not mint tokens below threshold', () => {
    const mintAmount = tokenMinter.calculateMintAmount('wallet1', 50);
    expect(mintAmount).toBe(0);
  });

  it('should calculate correct mint amount', () => {
    const mintAmount = tokenMinter.calculateMintAmount('wallet1', 1000);
    expect(mintAmount).toBe(100); // 10% of 1000
  });

  it('should respect max mint per wallet', () => {
    // First mint
    tokenMinter.calculateMintAmount('wallet1', 10000);
    
    // Second mint should only fill up to max
    const secondMintAmount = tokenMinter.calculateMintAmount('wallet1', 10000);
    expect(tokenMinter.getTotalMintedForWallet('wallet1')).toBe(1000);
  });

  it('should emit event on token minting', () => {
    let emittedData: any = null;
    tokenMinter.on('token_minted', (data) => {
      emittedData = data;
    });

    tokenMinter.calculateMintAmount('wallet1', 1000);
    
    expect(emittedData).toEqual({
      wallet: 'wallet1',
      amount: 100
    });
  });
});
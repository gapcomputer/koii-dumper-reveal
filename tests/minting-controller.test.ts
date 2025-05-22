import { describe, it, expect, beforeEach } from 'vitest';
import { MintingController } from '../src/token-minting/minting-controller';
import { AccessControl } from '../src/token-minting/access-control';

describe('MintingController', () => {
  let mintingController: MintingController;
  const validWallet = '0x1234567890123456789012345678901234567890';

  beforeEach(() => {
    mintingController = new MintingController();
    mintingController.resetState(); // Reset state before each test
  });

  it('should throw error for blocked wallet', async () => {
    const accessControl = new AccessControl();
    accessControl.blockAddress(validWallet);

    await expect(mintingController.mintTokens(validWallet)).rejects.toThrow('Wallet not authorized to mint tokens');
  });

  it('should track total minted tokens', async () => {
    const initialTotal = mintingController.getTotalMintedTokens();
    const mintedAmount = await mintingController.mintTokens(validWallet);
    
    const newTotal = mintingController.getTotalMintedTokens();
    expect(newTotal).toBe(initialTotal + mintedAmount);
  });

  it('should generate unique transaction hashes', async () => {
    const mintEvents = await Promise.all([
      mintingController.mintTokens(validWallet),
      mintingController.mintTokens(validWallet)
    ]);

    const events = mintingController.getMintingEvents();
    const uniqueHashes = new Set(events.map(e => e.transactionHash));
    
    expect(uniqueHashes.size).toBe(events.length);
  });

  it('should prevent excessive daily minting', async () => {
    // Add several minting events to approach the daily limit
    const maxAttempts = 50;
    try {
      await Promise.all(
        Array(maxAttempts).fill(null).map(() => 
          mintingController.mintTokens(validWallet)
        )
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Daily minting limit exceeded');
    }
  });
});
import { describe, it, expect, beforeEach } from 'vitest';
import { AccessControl } from '../src/token-minting/access-control';

describe('AccessControl', () => {
  let accessControl: AccessControl;
  const validWallet = '0x1234567890123456789012345678901234567890';
  const anotherValidWallet = '0x0987654321098765432109876543210987654321';

  beforeEach(() => {
    accessControl = new AccessControl();
  });

  it('should allow minting by default', () => {
    expect(accessControl.canMint(validWallet)).toBe(true);
  });

  it('should prevent minting for blocked addresses', () => {
    accessControl.blockAddress(validWallet);
    expect(accessControl.canMint(validWallet)).toBe(false);
  });

  it('should allow only whitelisted addresses when whitelist is used', () => {
    accessControl.addToWhitelist(validWallet);
    expect(accessControl.canMint(validWallet)).toBe(true);
    expect(accessControl.canMint(anotherValidWallet)).toBe(false);
  });

  it('should throw error for invalid address formats', () => {
    expect(() => accessControl.addToWhitelist('')).toThrow('Invalid wallet address');
    expect(() => accessControl.addToWhitelist('invalid')).toThrow('Invalid wallet address');
  });

  it('should handle case-insensitive address comparisons', () => {
    const mixedCaseWallet = '0x1234567890123456789012345678901234567890';
    const lowercaseWallet = mixedCaseWallet.toLowerCase();
    
    accessControl.blockAddress(lowercaseWallet);
    expect(accessControl.canMint(mixedCaseWallet)).toBe(false);
  });
});
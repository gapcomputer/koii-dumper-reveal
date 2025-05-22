import { describe, it, expect, beforeEach } from 'vitest';
import { TokenAccessControl } from '../src/access-control/token-access-control';

describe('TokenAccessControl', () => {
    let accessControl: TokenAccessControl;
    const validAddress1 = '0x1234567890abcdef1234567890abcdef12345678';
    const validAddress2 = '0x8765432109fedcba8765432109fedcba87654321';

    beforeEach(() => {
        accessControl = new TokenAccessControl([validAddress1], 100);
    });

    describe('Address Management', () => {
        it('should add allowed address', () => {
            accessControl.addAllowedAddress(validAddress2);
            expect(accessControl.getAllowedAddresses()).toContain(validAddress2);
        });

        it('should throw error when adding invalid address', () => {
            expect(() => accessControl.addAllowedAddress('')).toThrow('Invalid wallet address');
        });

        it('should remove allowed address', () => {
            accessControl.removeAllowedAddress(validAddress1);
            expect(accessControl.getAllowedAddresses()).not.toContain(validAddress1);
        });

        it('should blacklist address', () => {
            accessControl.blacklistAddress(validAddress2);
            expect(accessControl.getBlacklistedAddresses()).toContain(validAddress2);
        });
    });

    describe('Authorization Checks', () => {
        it('should authorize allowed address', () => {
            expect(accessControl.isAuthorized(validAddress1)).toBe(true);
        });

        it('should not authorize blacklisted address', () => {
            accessControl.blacklistAddress(validAddress1);
            expect(accessControl.isAuthorized(validAddress1)).toBe(false);
        });

        it('should not authorize invalid address', () => {
            expect(accessControl.isAuthorized('')).toBe(false);
        });
    });

    describe('Token Generation Limits', () => {
        it('should allow token generation within limit', () => {
            expect(accessControl.canGenerateTokens(50)).toBe(true);
        });

        it('should prevent token generation beyond limit', () => {
            expect(accessControl.canGenerateTokens(150)).toBe(false);
        });
    });
});
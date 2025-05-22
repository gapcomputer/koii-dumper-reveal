import { describe, it, expect } from 'vitest';
import { TokenGenerationAccessControl, UserRole, User } from './access-control';

describe('TokenGenerationAccessControl', () => {
  // Test Admin Role
  describe('Admin Role Token Generation', () => {
    const adminUser: User = { 
      id: 'admin1', 
      role: UserRole.ADMIN 
    };

    it('should allow token generation within admin limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(adminUser, 1000000)
      ).toBe(true);
    });

    it('should prevent token generation exceeding admin limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(adminUser, 1000001)
      ).toBe(false);
    });
  });

  // Test Standard Role
  describe('Standard Role Token Generation', () => {
    const standardUser: User = { 
      id: 'user1', 
      role: UserRole.STANDARD 
    };

    it('should allow token generation within standard limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(standardUser, 10000)
      ).toBe(true);
    });

    it('should prevent token generation exceeding standard limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(standardUser, 10001)
      ).toBe(false);
    });
  });

  // Test Restricted Role
  describe('Restricted Role Token Generation', () => {
    const restrictedUser: User = { 
      id: 'user2', 
      role: UserRole.RESTRICTED 
    };

    it('should allow token generation within restricted limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(restrictedUser, 100)
      ).toBe(true);
    });

    it('should prevent token generation exceeding restricted limit', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(restrictedUser, 101)
      ).toBe(false);
    });
  });

  // Test Edge Cases
  describe('Edge Cases', () => {
    it('should prevent token generation for null user', () => {
      expect(
        TokenGenerationAccessControl.isTokenGenerationAuthorized(null, 100)
      ).toBe(false);
    });

    it('should return correct token generation limits', () => {
      expect(
        TokenGenerationAccessControl.getTokenGenerationLimit(UserRole.ADMIN)
      ).toBe(1000000);
      expect(
        TokenGenerationAccessControl.getTokenGenerationLimit(UserRole.STANDARD)
      ).toBe(10000);
      expect(
        TokenGenerationAccessControl.getTokenGenerationLimit(UserRole.RESTRICTED)
      ).toBe(100);
    });
  });
});
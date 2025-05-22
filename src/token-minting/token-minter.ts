import { EventEmitter } from 'events';

interface TokenMintingConfig {
  minDumpThreshold: number;
  mintRatio: number;
  maxMintPerWallet: number;
}

export class TokenMinter extends EventEmitter {
  private config: TokenMintingConfig;
  private mintedTokens: Map<string, number>;

  constructor(config: TokenMintingConfig) {
    super();
    this.config = config;
    this.mintedTokens = new Map();
  }

  /**
   * Detect if a wallet has dumped tokens
   * @param wallet Wallet address
   * @param dumpAmount Amount of tokens dumped
   * @returns Whether the wallet qualifies for token minting
   */
  detectDump(wallet: string, dumpAmount: number): boolean {
    if (dumpAmount < this.config.minDumpThreshold) {
      return false;
    }

    const currentMinted = this.mintedTokens.get(wallet) || 0;
    return currentMinted < this.config.maxMintPerWallet;
  }

  /**
   * Calculate tokens to mint based on dump amount
   * @param wallet Wallet address
   * @param dumpAmount Amount of tokens dumped
   * @returns Number of tokens to mint
   */
  calculateMintAmount(wallet: string, dumpAmount: number): number {
    if (!this.detectDump(wallet, dumpAmount)) {
      return 0;
    }

    const mintAmount = Math.floor(dumpAmount * this.config.mintRatio);
    const currentMinted = this.mintedTokens.get(wallet) || 0;
    const remainingMintAllowance = this.config.maxMintPerWallet - currentMinted;

    const finalMintAmount = Math.min(mintAmount, remainingMintAllowance);
    this.mintedTokens.set(wallet, currentMinted + finalMintAmount);

    this.emit('token_minted', { wallet, amount: finalMintAmount });
    return finalMintAmount;
  }

  /**
   * Get total minted tokens for a wallet
   * @param wallet Wallet address
   * @returns Total minted tokens
   */
  getTotalMintedForWallet(wallet: string): number {
    return this.mintedTokens.get(wallet) || 0;
  }
}
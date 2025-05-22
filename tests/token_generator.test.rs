use solana_program::pubkey::Pubkey;
use solana_program_test::*;
use solana_sdk::{
    signature::{Keypair, Signer},
    transaction::Transaction,
};

use token_generator::calculate_generated_tokens;

#[tokio::test]
async fn test_token_generation_calculation() {
    // Test token generation with various input amounts
    assert_eq!(calculate_generated_tokens(1000), 100);
    assert_eq!(calculate_generated_tokens(10_000), 1000);
    assert_eq!(calculate_generated_tokens(2_000_000), 1_000_000); // Max cap test
}

#[tokio::test]
async fn test_zero_token_dump() {
    // Ensure zero token dump returns zero generated tokens
    assert_eq!(calculate_generated_tokens(0), 0);
}

#[tokio::test]
async fn test_high_volume_token_generation() {
    // Test high volume token generation with max cap
    let high_dump_amount = 10_000_000;
    assert_eq!(
        calculate_generated_tokens(high_dump_amount), 
        1_000_000 // Verify max cap is enforced
    );
}
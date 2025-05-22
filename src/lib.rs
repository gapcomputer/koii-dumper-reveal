pub mod lib {
    pub mod token_dumper;
}

// Re-export key components for easy access
pub use lib::token_dumper::{
    TokenDumperProgram,
    TokenDumperState,
    TokenDumperError,
};
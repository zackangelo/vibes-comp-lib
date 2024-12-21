//! This module allows us to access
//! the vibes GitHub repository and extract metadata
//! for use with prompting


mod primitives;
mod sections;

pub use primitives::VibePrimitive;
pub use sections::VibeSection;

pub enum VibeComponent {
    Primitive(VibePrimitive),
    Section(VibeSection)
}
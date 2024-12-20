use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RawVibesLibrary {
    #[serde(rename = "ok")]
    pub components: Vec<RawVibesComponent>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RawVibesComponent {
    pub name: String,
    pub dependencies: Vec<String>,
    pub registry_dependencies: Vec<String>,
    pub files: Vec<String>,
    pub doc: Option<String>,
    pub doc_file: Option<String>,
    pub example: String,
    pub example_file: String,
    pub component_name: String,
    pub source: HashMap<String, String>,
    pub component_type: String,
    pub description: Option<String>
}

impl RawVibesComponent {
    pub fn is_section(&self) -> bool {
        // assume its a section if any of the files start with "sections"
        self.component_type == "section"
    }

    pub fn is_primitive(&self) -> bool {
        self.component_type == "primitive"
    }
}
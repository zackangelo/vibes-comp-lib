use std::{collections::HashMap, fs::File};

use anyhow::Result;
use convert_case::Casing;
use serde::{Deserialize, Serialize};
use std::io::Write;

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
    pub doc: String,
    pub doc_file: String,
    pub example: String,
    pub example_file: String,
    pub component_name: String,
    pub source: HashMap<String, String>,
}

impl RawVibesComponent {
    pub fn is_section(&self) -> bool {
        // assume its a section if any of the files start with "sections"
        self.source.iter().any(|(f, _)| f.starts_with("sections"))
    }

    pub fn is_primitive(&self) -> bool {
        match self.files.first() {
            Some(f) => f.starts_with("primitives"),
            None => false,
        }
    }
}

fn main() -> Result<()> {
    println!("Hello, world!");
    let raw_lib_str = std::fs::read_to_string("components.json")?;
    let raw_lib: RawVibesLibrary = serde_json::from_str(&raw_lib_str)?;

    // Generate TypeScript content
    let ts_content = generate_ts_file_content(&raw_lib);

    // Write to output file
    let mut output_file = File::create("component-library.ts")?;
    output_file.write_all(ts_content.as_bytes())?;

    Ok(())
}

fn generate_ts_file_content(lib: &RawVibesLibrary) -> String {
    let mut output = String::from("export const COMPONENT_LIBRARY: any = {\n");

    for component in &lib.components {
        // Only do primitives for now
        if !component.is_primitive() {
            continue;
        }

        write_ts_component(&mut output, component);
    }

    output.push_str("};\n");
    output
}

fn write_ts_component(output: &mut String, component: &RawVibesComponent) {
    // Start component object
    output.push_str(&format!(
        "  \"{}\": {{\n",
        component.component_name.to_case(convert_case::Case::Pascal)
    ));

    // Add dependencies
    output.push_str("    deps: [");
    output.push_str(
        &component
            .dependencies
            .iter()
            .map(|d| format!("'{}'", d))
            .collect::<Vec<_>>()
            .join(", "),
    );
    output.push_str("],\n");

    // Add registry dependencies
    output.push_str("    registryDeps: [");
    output.push_str(
        &component
            .registry_dependencies
            .iter()
            .map(|d| format!("'{}'", d))
            .collect::<Vec<_>>()
            .join(", "),
    );
    output.push_str("],\n");

    // Add files
    output.push_str("    files: {\n");

    for (file_path, content_str) in &component.source {
        let escaped_content = escape_template_literal(content_str);
        output.push_str(&format!("      '{}': `{}`", file_path, escaped_content));
        output.push_str(",\n");
    }

    output.push_str("    },\n");
    output.push_str("  },\n");
}

fn escape_template_literal(content: &str) -> String {
    content.replace("`", "\\`").replace("${", "\\${") // Escape template literal interpolation
}

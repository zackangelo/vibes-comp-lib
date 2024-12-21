use std::fs;
use convert_case::Casing;
use crate::raw::{RawVibesLibrary, RawVibesComponent};
use std::io;

mod components;

pub use components::generate_library_content;
pub use components::generate_library_content_xmlish;
pub use components::generate_library_content_xmlish2;
use crate::utils::escape_template_literal;
use crate::vibes::VibePrimitive;

pub fn setup() -> Result<(), io::Error>{
    if !fs::metadata("./out").is_ok() {
        fs::create_dir_all("./out")?;
    }

    Ok(())
}

pub fn generate_ts_file_content(lib: &RawVibesLibrary) -> String {
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

pub fn generate_ts_file_content2() -> String {
    use crate::vibes::vibe_primitives;

    let mut output = String::from("export const COMPONENT_LIBRARY: any = {\n");

    for component in vibe_primitives() {
        write_ts_component2(&mut output, &component);
    }

    output.push_str("};\n");
    output
}

fn write_ts_component2(output: &mut String, component: &VibePrimitive) {
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




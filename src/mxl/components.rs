use serde::{Serialize, Deserialize};
use crate::raw::RawVibesLibrary;
use std::path::PathBuf;
use crate::enrichments::{read_props_file, read_description_file};
use crate::utils::{self, kebab_to_pascal_case};

#[derive(Debug, Serialize, Deserialize, PartialEq)]
struct LibComponentJson {
    name: String,
    path: String,
    props: Option<String>,
    example: String,
    description: Option<String>,
}


pub fn generate_library_content(lib: &RawVibesLibrary) -> String {
    let mut output = String::from("export const COMPONENTS: any[] = ");

    let mut components = Vec::new();
    for component in &lib.components {
        // Only do primitives for now
        if !component.is_primitive() {
            continue;
        }


        let path = component.files
            .iter()
            .find(|f| f.contains("index.tsx"))
            .map(|s| s.to_string())
            .unwrap_or_else(|| "missing".to_string());

        let mut abc = PathBuf::from("src/components");
        abc.push(path);

        let def = abc.parent().unwrap().to_string_lossy().to_string();
        
        let props = read_props_file(&component.name);
        let description = read_description_file(&component.name)
            .or(component.description.clone());

        let lc = LibComponentJson {
            name: utils::kebab_to_pascal_case(&component.name),
            path: def,
            props,
            example: component.example.clone(),
            description
        };

        components.push(lc)
    }


    let str = serde_json::to_string_pretty(&components)
        .unwrap();
    output.push_str(&str);
    output.push_str(";\n");
    output
}

pub fn generate_library_content_xmlish(lib: &RawVibesLibrary) -> String {
    let mut output = String::from("");

    for component in &lib.components {
        // Only do primitives for now
        if !component.is_primitive() {
            continue;
        }

        let path = component.files
            .iter()
            .find(|f| f.contains("index.tsx"))
            .map(|s| s.to_string())
            .unwrap_or_else(|| "missing".to_string());

        let mut abc = PathBuf::from("@/vibes/soul");
        abc.push(path);

        let def = abc.parent().unwrap().to_string_lossy().to_string();

        let cn = kebab_to_pascal_case(&component.name);
        output.push_str(&format!("<component name=\"{}\" file=\"{}\">\n", &cn, &def));

        let description = read_description_file(&component.name)
            .or(component.description.clone());
        if let Some(str) = description {
            output.push_str(&format!("  {}\n", &str));
        }


        let props = read_props_file(&component.name);
        if let Some(str) = props {
            output.push_str("  <component_props>\n");
            output.push_str(&indent_string(&str, 4));
            output.push_str("\n");
            output.push_str("  </component_props>\n");
        }

        output.push_str("  <component_example>\n");
        output.push_str(&indent_string(&component.example, 4));
        output.push_str("\n");
        output.push_str("  </component_example>\n");

        output.push_str("</component>\n");


        output.push_str("\n");
    }
    output.push_str("\n");
    output.to_string()
}

pub fn indent_string(input: &str, spaces: usize) -> String {
    let indent = " ".repeat(spaces);
    input
        .lines()
        .map(|line| format!("{}{}", indent, line))
        .collect::<Vec<String>>()
        .join("\n")
}
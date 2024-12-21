use std::path::PathBuf;
use std::fs;

pub fn read_props_file(directory_name: &str) -> Option<String> {
    let mut path = PathBuf::from("./enrichment");
    path.push(directory_name);
    path.push("props.tsx");

    if path.exists() && path.is_file() {
        fs::read_to_string(path).ok()
    } else {
        None
    }
}

pub fn read_description_file(directory_name: &str) -> Option<String> {
    let mut path = PathBuf::from("./enrichment");
    path.push(directory_name);
    path.push("description.txt");

    if path.exists() && path.is_file() {
        fs::read_to_string(path).ok()
    } else {
        None
    }
}



fn split_into_lines(input: &str) -> Vec<String> {
    input.lines().map(|line| line.to_string()).collect()
}
pub fn read_dependencies(directory_name: &str) -> Vec<String> {
    let mut path = PathBuf::from("./enrichment");
    path.push(directory_name);
    path.push("dependencies.txt");

    if path.exists() && path.is_file() {
        if let Some(str) = fs::read_to_string(path).ok() {
            return split_into_lines(&str);
        }
    }

    Vec::new()
}

pub fn read_registry_dependencies(directory_name: &str) -> Vec<String> {
    let mut path = PathBuf::from("./enrichment");
    path.push(directory_name);
    path.push("registry-dependencies.txt");

    if path.exists() && path.is_file() {
        if let Some(str) = fs::read_to_string(path).ok() {
            return split_into_lines(&str);
        }
    }

    Vec::new()
}

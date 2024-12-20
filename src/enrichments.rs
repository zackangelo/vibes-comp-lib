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

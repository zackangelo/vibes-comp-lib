use std::collections::HashMap;
use std::fs;
use std::io;
use std::io::Read;
use std::path::Path;

/// Converts a kebab-case string to PascalCase.
///
/// # Examples
///
/// ```
/// use libviber::utils::kebab_to_pascal_case;
///
/// let result = kebab_to_pascal_case("kebab-case-string");
/// assert_eq!(result, "KebabCaseString");
///
/// let result = kebab_to_pascal_case("another-example");
/// assert_eq!(result, "AnotherExample");
///
/// let result = kebab_to_pascal_case("singleword");
/// assert_eq!(result, "Singleword");
///
/// let result = kebab_to_pascal_case("");
/// assert_eq!(result, "");
/// ```
pub fn kebab_to_pascal_case(s: &str) -> String {
    s.split('-')
        .map(|word| {
            let mut c = word.chars();
            match c.next() {
                None => String::new(),
                Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
            }
        })
        .collect()
}


pub fn list_files_in_directory(path: &str) -> io::Result<Vec<String>> {
    let mut files = Vec::new();
    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            if let Some(file_name) = path.file_name() {
                files.push(file_name.to_string_lossy().to_string());
            }
        }
    }

    Ok(files)
}

pub fn read_file_contents(path: &str) -> io::Result<String> {
    let mut file = fs::File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

pub fn extract_frontmatter(content: &str) -> HashMap<String, String> {
    use serde_yaml::Value;

    let mut frontmatter = HashMap::new();
    let parts: Vec<&str> = content.splitn(3, "---").collect();

    if parts.len() == 3 {
        if let Ok(yaml) = serde_yaml::from_str::<Value>(parts[1]) {
            if let Some(mapping) = yaml.as_mapping() {
                for (key, value) in mapping {
                    if let (Some(k), Some(v)) = (key.as_str(), value.as_str()) {
                        frontmatter.insert(k.to_string(), v.to_string());
                    }
                }
            }
        }
    }

    frontmatter
}

pub fn ensure_directory(path: &str) -> Result<(), io::Error> {
    if !fs::metadata(path).is_ok() {
        fs::create_dir_all(path)?;
    }

    Ok(())
}

pub fn enumerate_directories(path: &str) -> io::Result<Vec<String>> {
    let mut directories = Vec::new();
    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            if let Some(dir_name) = path.file_name() {
                directories.push(dir_name.to_string_lossy().to_string());
            }
        }
    }
    Ok(directories)
}

pub fn read_files_in_directory(path: &str) -> io::Result<HashMap<String, String>> {
    let mut files_contents = HashMap::new();
    let base_path = Path::new(path);

    for entry in fs::read_dir(base_path)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            if let Some(relative_path) = path.strip_prefix(base_path).ok().and_then(|p| p.to_str()) {
                let contents = fs::read_to_string(&path)?;
                files_contents.insert(relative_path.to_string(), contents);
            }
        }
    }

    Ok(files_contents)
}


pub fn escape_template_literal(content: &str) -> String {
    content.replace("`", "\\`").replace("${", "\\${") // Escape template literal interpolation
}
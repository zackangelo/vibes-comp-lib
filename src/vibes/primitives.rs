use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use crate::utils::{ensure_directory, enumerate_directories, enumerate_files, escape_template_literal, extract_frontmatter, kebab_to_pascal_case, list_files_in_directory, read_file_contents};
use crate::enrichments::read_description_file;

pub struct VibePrimitive {
    pub component_name: String,
    pub doc: Option<String>,
    pub example: Option<String>,
    pub description: Option<String>,
    pub source: HashMap<String, String>,
    pub files: Vec<String>,
    pub import: String,
    pub props: Option<String>,
    pub dependencies: Vec<String>,
    pub registry_dependencies: Vec<String>,
}

pub fn vibe_primitives() -> Vec<VibePrimitive> {
    let path = "./vibes/apps/web/vibes/soul/primitives";
    let directories = enumerate_directories(path).unwrap();

    let mut result = vec![];

    for dir in directories {
        let item = vibe_primitive_from_dir(&dir);

        result.push(item);
    }

    // pick up calendar
    let files = enumerate_files(path).unwrap();
    for file in files {
        let item = vibe_primitive_from_file(&file);

        result.push(item);
    }

    result
}



pub fn vibe_primitive_from_dir(name: &str) -> VibePrimitive {
    let component_name: String = kebab_to_pascal_case(name);

    let import = format!("@/vibes/soul/primitives/{}", name);

    let path = format!("./vibes/apps/web/vibes/soul/primitives/{}", name);
    let files : Vec<String> = list_files_in_directory(&path).unwrap_or(Vec::new());

    let path = format!("./vibes/apps/web/vibes/soul/docs/{}.mdx", name);
    let doc = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);

    let mut description = Option::None;
    
    if let Some(str) = doc.clone() {
        let hm = extract_frontmatter(&str);
        description = hm.get("description").map(|s| s.to_owned());
    }

    if let Some(str) = read_description_file(&name) {
      description = Option::Some(str)
    }
    

    let path = format!("./vibes/apps/web/vibes/soul/examples/primitives/{}/index.tsx", name);
    let example = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);


    ensure_directory(&format!("./enrichment/{}", name)).expect("failed to create directory");

    let path = format!("./enrichment/{}/props.tsx", name);
    let props = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);


    let mut source: HashMap<String, String> = HashMap::new();
    for file in &files {
        let path = format!("./vibes/apps/web/vibes/soul/primitives/{}/{}", name, file);
        if let Ok(content) = read_file_contents(&path) {
            let key = format!("./vibes/soul/primitives/{}/{}", name, file);
            source.insert(key, escape_template_literal(&content));
        }
    }

    let meta = q(name);

    let mut registry_dependencies = Vec::new();
    let mut dependencies = Vec::new();

    if let Some(m) = meta {
        // swap them because they be silly
        registry_dependencies = m.dependencies;
        dependencies = m.registry_dependencies;
    }

    // TODO: Uniq
    for enrichment in crate::enrichments::read_dependencies(name) {
        dependencies.push(enrichment);
    }

    // TODO: Uniq
    for enrichment in crate::enrichments::read_registry_dependencies(name) {
        registry_dependencies.push(enrichment);
    }

    VibePrimitive {
        component_name,
        doc,
        example,
        description,
        source,
        files,
        import,
        props,
        // swap the names
        registry_dependencies,
        dependencies,
    }
}


pub fn vibe_primitive_from_file(name: &str) -> VibePrimitive {
    let n = name.replace(".tsx","");
    let component_name: String = kebab_to_pascal_case(&n);

    let import = format!("@/vibes/soul/primitives/{}", n);

    let files : Vec<String> = vec![ name.to_string() ];

    let path = format!("./vibes/apps/web/vibes/soul/docs/{}.mdx", n);
    let doc = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);

    let mut description = Option::None;

    if let Some(str) = doc.clone() {
        let hm = extract_frontmatter(&str);
        description = hm.get("description").map(|s| s.to_owned());
    }

    if let Some(str) = read_description_file(&name) {
        description = Option::Some(str)
    }


    // calendar has 3 examples
    let path = format!("./vibes/apps/web/vibes/soul/examples/primitives/{}/index.tsx", n);
    let example = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);


    ensure_directory(&format!("./enrichment/{}", n)).expect("failed to create directory");

    let path = format!("./enrichment/{}/props.tsx", name);
    let props = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);


    let mut source: HashMap<String, String> = HashMap::new();
    for file in &files {
        let path = format!("./vibes/apps/web/vibes/soul/primitives/{}/{}", name, file);
        if let Ok(content) = read_file_contents(&path) {
            let key = format!("./vibes/soul/primitives/{}/{}", name, file);
            source.insert(key, escape_template_literal(&content));
        }
    }

    let meta = q(name);

    let mut registry_dependencies = Vec::new();
    let mut dependencies = Vec::new();

    if let Some(m) = meta {
        // swap them because they be silly
        registry_dependencies = m.dependencies;
        dependencies = m.registry_dependencies;
    }

    // TODO: Uniq
    for enrichment in crate::enrichments::read_dependencies(name) {
        dependencies.push(enrichment);
    }

    // TODO: Uniq
    for enrichment in crate::enrichments::read_registry_dependencies(name) {
        registry_dependencies.push(enrichment);
    }

    VibePrimitive {
        component_name,
        doc,
        example,
        description,
        source,
        files,
        import,
        props,
        // swap the names
        registry_dependencies,
        dependencies,
    }
}


fn q(name: &str) -> Option<VibeMeta> {
    let records = serde_json::from_str::<Vec<VibeMeta>>(JSON).unwrap();
    let record = records.iter().find(|r| r.name == name);
    if let Some(r) = record {
        return Some(r.clone());
    }

    Option::None
}


#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
struct VibeMeta
{
    pub name: String,
    pub dependencies: Vec<String>,
    #[serde(rename = "registryDependencies")]
    pub registry_dependencies: Vec<String>,
    pub files: Vec<String>,
}

// extracted from ~/vibes/apps/web/vibes/soul/primitives.ts
const JSON : &str = r#"[
  {
    "name": "accordions",
    "dependencies": ["clsx", "@radix-ui/react-accordion"],
    "registryDependencies": [],
    "files": ["primitives/accordions/index.tsx"]
  },
  {
    "name": "alert",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/alert/index.tsx"]
  },
  {
    "name": "animated-link",
    "dependencies": [],
    "registryDependencies": [],
    "files": ["primitives/animated-link/index.tsx"]
  },

  {
    "name": "badge",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/badge/index.tsx"]
  },
  {
    "name": "banner",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/banner/index.tsx"]
  },
  {
    "name": "blog-post-card",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/blog-post-card/index.tsx"]
  },
  {
    "name": "breadcrumbs",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/breadcrumbs/index.tsx"]
  },
  {
    "name": "button",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/button/index.tsx"]
  },
  {
    "name": "button-link",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/button-link/index.tsx"]
  },
  {
    "name": "calendar",
    "dependencies": ["clsx", "lucide-react", "react-day-picker"],
    "registryDependencies": [],
    "files": ["primitives/calendar.tsx"]
  },
  {
    "name": "card",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/card/index.tsx"]
  },
  {
    "name": "card-carousel",
    "dependencies": ["clsx"],
    "registryDependencies": ["carousel"],
    "files": ["primitives/card-carousel/index.tsx"]
  },
  {
    "name": "carousel",
    "dependencies": ["embla-carousel-react", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/carousel/index.tsx"]
  },
  {
    "name": "checkbox",
    "dependencies": ["clsx", "lucide-react", "@radix-ui/react-checkbox"],
    "registryDependencies": [],
    "files": ["primitives/checkbox/index.tsx"]
  },
  {
    "name": "counter",
    "dependencies": ["lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/counter/index.tsx"]
  },
  {
    "name": "cursor-pagination",
    "dependencies": ["lucide-react", "nuqs", "clsx"],
    "registryDependencies": [],
    "files": ["primitives/cursor-pagination/index.tsx"]
  },
  {
    "name": "dropdown",
    "dependencies": ["clsx", "lucide-react", "@radix-ui/react-dropdown-menu"],
    "registryDependencies": [],
    "files": ["primitives/dropdown/index.tsx"]
  },
  {
    "name": "favorite",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": [
      "primitives/favorite/index.tsx",
      "primitives/favorite/heart.tsx",
      "primitives/favorite/styles.css"
    ]
  },
  {
    "name": "feature",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": ["button"],
    "files": ["sections/feature/index.tsx", "primitives/icon/index.tsx"]
  },
  {
    "name": "featured-video",
    "dependencies": ["clsx"],
    "registryDependencies": ["button"],
    "files": ["sections/featured-video/index.tsx"]
  },
  {
    "name": "input",
    "dependencies": ["clsx", "lucide-react"],
    "registryDependencies": [],
    "files": ["primitives/input/index.tsx"]
  },
  {
    "name": "inline-email-form",
    "dependencies": ["lucide-react", "@conform-to/react", "@conform-to/zod"],
    "registryDependencies": [],
    "files": ["primitives/inline-email-form/index.tsx"]
  },
  {
    "name": "pagination",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/pagination/index.tsx"]
  },
  {
    "name": "price-label",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/price-label/index.tsx"]
  },
  {
    "name": "product-card",
    "dependencies": ["clsx"],
    "registryDependencies": ["badge", "checkbox", "price-label"],
    "files": ["primitives/product-card/index.tsx", "primitives/product-card/compare.tsx"]
  },
  {
    "name": "products-carousel",
    "dependencies": ["clsx"],
    "registryDependencies": ["product-card", "carousel"],
    "files": ["primitives/products-carousel/index.tsx"]
  },
  {
    "name": "products-list",
    "dependencies": [],
    "registryDependencies": ["product-card"],
    "files": ["primitives/products-list/index.tsx"]
  },
  {
    "name": "rating",
    "dependencies": [],
    "registryDependencies": [],
    "files": ["primitives/rating/index.tsx"]
  },
  {
    "name": "spinner",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/spinner/index.tsx"]
  },
  {
    "name": "textarea",
    "dependencies": ["clsx"],
    "registryDependencies": [],
    "files": ["primitives/textarea/index.tsx"]
  }
]"#;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn build_primitives() {
        // Setup: create a temporary directory structure for testing
        let p = vibe_primitives();

        assert_eq!(p.len(), 39);
    }

    #[test]
    fn build_primitive() {
        // Setup: create a temporary directory structure for testing
        let p = vibe_primitive_from_dir("alert");

        assert_eq!(p.component_name, "Alert");
        assert_eq!(p.files.len(), 1);
        assert_ne!(p.example, Option::None);
        assert_ne!(p.description, Option::None);
        assert_eq!(p.import, "@/vibes/soul/primitives/alert".to_string());
    }

    #[test]
    fn build_primitive_from_file() {
        // Setup: create a temporary directory structure for testing
        let p = vibe_primitive_from_file("calendar.tsx");

        assert_eq!(p.component_name, "Calendar");
        assert_eq!(p.files.len(), 1);
        assert_ne!(p.doc, Option::None);
        assert_eq!(p.example, Option::None);
        assert_eq!(p.description, Option::None);
        assert_eq!(p.import, "@/vibes/soul/primitives/calendar".to_string());
    }
}
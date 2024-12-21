use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use crate::utils::{ensure_directory, enumerate_directories, extract_frontmatter, kebab_to_pascal_case, list_files_in_directory, read_file_contents, read_files_in_directory};

pub struct VibeSection {
    pub section_name: String,
    pub files: Vec<String>,
    pub import: String,
    pub doc: Option<String>,
    pub description: Option<String>,
    pub dependencies: Vec<String>,
    pub registry_dependencies: Vec<String>,
    pub source: HashMap<String, String>,
    pub props: Option<String>,
    pub example: Option<String>,
}

pub fn vibe_sections() -> Vec<VibeSection> {
    let path = "./vibes/apps/web/vibes/soul/sections";
    let directories = enumerate_directories(path).unwrap();

    let mut result = vec![];

    for dir in directories {
        let item = vibe_section(&dir);
        result.push(item);
    }

    result
}


pub fn vibe_section(name: &str) -> VibeSection {
    let section_name: String = kebab_to_pascal_case(name);

    let import = format!("@/vibes/soul/sections/{}", name);

    let path = format!("./vibes/apps/web/vibes/soul/sections/{}", name);
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

    let path = format!("./vibes/apps/web/vibes/soul/examples/sections/{}/index.tsx", name);
    let example = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);


    ensure_directory(&format!("./enrichment/{}", name)).expect("failed to create directory");

    let path = format!("./enrichment/{}/props.tsx", name);
    let props = read_file_contents(&path)
        .map(|o| Option::Some(o.to_owned()))
        .unwrap_or(Option::None);

    let mut source: HashMap<String, String> = HashMap::new();
    if let Ok(files) = read_files_in_directory(&path) {
        source = files
    }

    let meta = q(name);

    VibeSection {
        section_name,
        import,
        files,
        doc,
        description,
        source,
        props,
        example,
        // swap the names
        registry_dependencies: meta.clone().map(|m| m.dependencies).unwrap_or_else(Vec::new),
        dependencies: meta.map(|m| m.registry_dependencies).unwrap_or_else(Vec::new),
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

// extracted from ~/vibes/apps/web/vibes/soul/sections.ts
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
    "files": [
      "primitives/product-card/index.tsx",
      "primitives/product-card/compare.tsx"
    ]
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
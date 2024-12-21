use libviber;
use libviber::raw::RawVibesLibrary;
use libviber::mxl;

use std::fs::File;

use anyhow::Result;
use std::io::Write;
use structopt::StructOpt;

#[derive(StructOpt, Debug)]
#[structopt(name = "viber")]
struct Opt {
    /// Activate debug mode
    #[structopt(short, long)]
    debug: bool,
}

fn main() -> Result<()> {
    let opt = Opt::from_args();
    println!("{:#?}", opt);

    mxl::setup().expect("Issues Setting Up");

    let raw_lib_str = std::fs::read_to_string("./components.json")?;
    let raw_lib: RawVibesLibrary = serde_json::from_str(&raw_lib_str)?;

    // Generate TypeScript content
    let ts_content = mxl::generate_ts_file_content(&raw_lib);
    let mut output_file = File::create("./out/component-library.ts")?;
    output_file.write_all(ts_content.as_bytes())?;

    let lib_content = mxl::generate_library_content(&raw_lib);
    let mut output_file = File::create("./out/prompt-components.ts")?;
    output_file.write_all(lib_content.as_bytes())?;

    let lib_content = mxl::generate_library_content_xmlish(&raw_lib);
    let mut output_file = File::create("./out/prompt-components.txt")?;
    output_file.write_all(lib_content.as_bytes())?;

    let lib_content = mxl::generate_library_content_xmlish2();
    let mut output_file = File::create("./out/prompt-components2.txt")?;
    output_file.write_all(lib_content.as_bytes())?;

    Ok(())
}



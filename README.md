# Vibes Comp Lib

This rust CLI will read a copy of the [Vibes](https://github.com/makeswift/vibes) repository and generate the files needed for the vibes.new prompt engine.

## Setup

Grab a copy of the vibes repo (I put it in `~/vibes` which is ignored by git)
We are using our fork which has various metadata fixed for our usage

```sh
git clone git@github.com:mixlayer/vibes.git
git checkout dds/components
```

> [!info]
> From time to time you'll need to pull the fresh commits in this clone

> [!info]
> The registry dependencies and intra-component deps come from extracting data
> manually from the repo and embedding in rust literal strings.

## Enrichment

The `~/enrichment` directory holds manually overrides of the various data elements.

__Options__

- `props.tsx` is the current process for providing the props text in the XML'ish
- `description.txt` - provides a way to override (or provide) the description of a primitive or section

## Output

```
out/
    component-library.ts
    prompt-components.ts
    prompt-components.txt -- XML ish output for direct prompt embedding
    prompt-components2.txt -- XML ish output for direct prompt embedding
```

`prompt-components.txt` - is based on reading a cached `components.json`

`prompt-components2.txt` - is based on reading the raw `~/vibes` clone
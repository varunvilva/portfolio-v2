const modules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const images: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const filename = path.split('/').pop();
  if (filename) images[filename] = url;
}

export const resolveImage = (filename: string): string => {
  const url = images[filename];
  if (!url) {
    throw new Error(
      `Unknown image "${filename}". Drop the file into src/assets/ and reference it by filename in content.json. Available: ${Object.keys(images).sort((a, b) => a.localeCompare(b)).join(', ')}`,
    );
  }
  return url;
};

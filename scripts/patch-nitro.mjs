import fs from 'node:fs';
import path from 'node:path';

const filesToPatch = [
  path.join(process.cwd(), 'node_modules', 'nf3', 'dist', '_chunks', 'trace.mjs'),
  path.join(process.cwd(), 'node_modules', 'nitro', 'dist', '_chunks', 'trace.mjs')
];

for (const file of filesToPatch) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('import { nodeFileTrace } from "@vercel/nft";')) {
      content = content.replace(
        'import { nodeFileTrace } from "@vercel/nft";',
        'import _nft from "@vercel/nft";\nconst nodeFileTrace = _nft.nodeFileTrace || _nft.default?.nodeFileTrace || _nft;'
      );
      fs.writeFileSync(file, content, 'utf8');
      console.log(`[postinstall] Successfully patched ${file} for Vercel/Node ESM compatibility.`);
    } else {
      console.log(`[postinstall] Nitro trace file already patched or has compatible import.`);
    }
  }
}

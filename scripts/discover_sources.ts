import { SOURCE_CATALOG } from '../lib/constants';

function main() {
  console.log(JSON.stringify({ total: SOURCE_CATALOG.length, sources: SOURCE_CATALOG }, null, 2));
}

main();

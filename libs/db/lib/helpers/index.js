const fs = require('fs').promises;
const { existsSync } = require('fs');
const yaml = require('js-yaml');

async function loadYaml(path = '') {
  if (!/\.(yaml|yml)$/.test(path)) path = `${path}.yaml`;
  if (!existsSync(path)) {
    console.error(`Cannot open file: ${path}`);
    process.exitCode = 1;
    throw new Error();
  }

  try {
    return yaml.load(await fs.readFile(path, { encoding: 'utf8' }));
  } catch (e) {
    process.exitCode = 1;

    if (e instanceof Error && e.name == 'YAMLException') {
      console.error(`Cannot parse file. The YAML is invalid.`);
      console.error(e.message);
    }

    throw e;
  }
}

module.exports = {
  loadYaml,
};

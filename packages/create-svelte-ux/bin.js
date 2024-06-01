#!/usr/bin/env node

import * as p from '@clack/prompts';
import { program, Option, InvalidArgumentError } from 'commander';
import { bold, cyan, gray, green, italic } from '@kitql/helpers';
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';

// the first argument is the name of the project
let projectDir = process.argv[2];
let projectName = projectDir;

// When it will be in the same mono repo we will be able to get the version
const { version } = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf-8'));
console.log(`${gray(`create-svelte-ux version ${version}`)}\n`);

// prepare options
const templatesDir = sourcePath(`./templates`);
const options = fs.readdirSync(templatesDir).map((templateDir) => {
  // in .meta.json you can find:
  /** @type {{label?: string, hint?: string, apiUrl?: string}} */
  let data = {};
  const metaPath = path.join(templatesDir, templateDir, '.meta.json');
  if (fs.existsSync(metaPath)) {
    data = JSON.parse(readFileSync(metaPath, 'utf-8'));
  }
  return { ...data, value: templateDir };
});

program.argument('[project_name]', 'optional project name');
program.addOption(
  new Option('-t, --template <template>', 'template you want to use').choices(
    options.map((c) => c.value)
  )
);
program.addOption(
  new Option('-s, --schema <schema>', '"local" or "http..."').argParser((value) => {
    if (value === 'local' || value.startsWith('http')) {
      return value;
    }
    throw new InvalidArgumentError('Should be "local" or "http..." or do not set it!');
  })
);

program.parse(process.argv);
const options_cli = program.opts();

p.intro('🎨 Welcome to Svelte UX!');

// if we weren't given a directory, then we should ask
if (!projectDir) {
  const dir = await p.text({
    message: `Where should we create your project?`,
    placeholder: '  (press Enter to use the current directory)',
  });

  if (p.isCancel(dir)) {
    process.exit(1);
  }

  if (dir) {
    projectDir = dir;
    projectName = dir;
  } else {
    projectDir = '.';
  }
}

// if we were told to use the current directory then we need
// a more appropriate name for the project
if (projectDir === '.') {
  projectName = 'svelte-ux-app';
}
let dirToCreate = true;

// project location emtpy?
if (fs.existsSync(projectDir)) {
  if (fs.readdirSync(projectDir).length > 0) {
    const force = await p.confirm({
      message:
        'Target directory is not empty. Continue anyway? This might overwrite existing files.',
      initialValue: false,
    });
    dirToCreate = false;

    // bail if `force` is `false` or the user cancelled with Ctrl-C
    if (force !== true) {
      process.exit(1);
    }
  }
}

// create the project directory if necessary
if (dirToCreate && !fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir);
}

const template = options_cli.template
  ? options_cli.template
  : await p.select({
      message: 'Which template do you want to use?',
      initialValue: 'starter',
      options,
    });
if (p.isCancel(template)) {
  process.exit(1);
}
const svelteNext = await p.confirm({
  message: 'Would you like to use Svelte 5 (unstable)?',
  initialValue: false,
});
if (p.isCancel(svelteNext)) {
  process.exit(1);
}
const svelteVersion = svelteNext ? 'next' : 'latest';

const templateDir = path.join(templatesDir, template);
const templateMeta = options.find((option) => option.value === template);
if (!templateMeta) {
  // this will never happen, but it helps to types later
  exit(1);
}

copy(
  sourcePath(path.join(templatesDir, template)),
  projectDir,
  {
    PROJECT_NAME: projectName,
    SVELTE_UX_VERSION: version,
    SVELTE_VERSION: svelteVersion,
  },
  { '.meta..gitignore': '.gitignore' },
  ['.meta.json']
);

const userAgent = process.env.npm_config_user_agent;
const pm = userAgent ? userAgent.split('/')[0] : 'npm';
const runCmd = pm === 'pnpm' ? 'dev' : 'run dev';

p.outro(`🎉 Everything is ready!

👉 Next Steps
0️⃣  Go to your project     :  cd ${green(projectDir)}
1️⃣  Install dependencies   :  ${green(`${pm} i`)}
2️⃣  Start your application :  ${green(`${pm} ${runCmd}`)}`);

console.log(
  gray(
    italic(
      `${bold('❔ More help')} ` +
        `at ${cyan('https://svelte-ux.techniq.dev/')} ` +
        `(📄 Docs, ⭐ Github, 📣 Discord, ...)\n`
    )
  )
);

// Function to copy files recursively
function copy(
  /** @type {string} */ sourceDir,
  /** @type {string} */ destDir = projectDir,
  /** @type {Record<string, string>} */ transformMap = {},
  /** @type {Record<string, string>} */ transformFileMap = {},
  /** @type {string[]} */ ignoreList = []
) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  const paths = fs.readdirSync(sourceDir);
  for (const p of paths) {
    const sourcePath = path.join(sourceDir, p);
    const sourcePathRel = path.relative(sourceDir, sourcePath);
    if (ignoreList.includes(sourcePathRel)) {
      // Skip ignored sources.
      continue;
    }
    const fileDest = Object.entries(transformFileMap).reduce((acc, [key, value]) => {
      return acc.replace(key, value);
    }, p);
    const destFilePath = path.join(destDir, fileDest);
    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      // In case of a directory, copy files recursively.
      copy(sourcePath, destFilePath, transformMap, transformFileMap, ignoreList);
    } else if (stats.isFile()) {
      // Read the source file.
      const source = fs.readFileSync(sourcePath);
      // Apply transformations if necessary.
      const result = Object.entries(transformMap).reduce((prev, [pattern, value]) => {
        return prev.replaceAll(pattern, value);
      }, source.toString());
      // Copy result to destination.
      fs.writeFileSync(destFilePath, result);
    }
  }
}

function sourcePath(/** @type {string} */ file) {
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, file);
}

function pCancel(cancelText = 'Operation cancelled.') {
  p.cancel(cancelText);
  process.exit(1);
}

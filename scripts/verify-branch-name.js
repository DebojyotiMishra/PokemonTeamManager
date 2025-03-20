#!/usr/bin/env node

const branchName = require('child_process')
  .execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();

const validTypes = ['feat', 'fix', 'test', 'chore'];
const pattern = new RegExp(`^(${validTypes.join('|')})/[a-z0-9-]+$`);

if (!pattern.test(branchName)) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `Error: Invalid branch name format: ${branchName}
    Branch names must follow the format: <type>/<description>
    where type is one of: ${validTypes.join(', ')}
    and description uses lowercase letters, numbers, and hyphens.
    Example: feat/add-user-auth`
  );
  process.exit(1);
} 
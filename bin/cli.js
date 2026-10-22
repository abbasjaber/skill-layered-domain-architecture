#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'layered-domain-architecture';
const SOURCE_SKILL_MD = path.join(__dirname, '..', 'skills', SKILL_NAME, 'SKILL.md');

const args = process.argv.slice(2);
const isHelp = args.includes('--help') || args.includes('-h');
const isGlobal = args.includes('--global') || args.includes('-g');
const isAll = args.includes('--all');

if (isHelp) {
  console.log(`
Layered Domain Architecture Skill Installer

Usage:
  npx github:abbasjaber/skill-layered-domain-architecture [options]

Options:
  (no flags)     Install into current repository (.agents/skills/${SKILL_NAME})
  -g, --global   Install globally for all projects (~/.gemini/config and ~/.agents)
  --all          Install both locally in current repo and globally
  -h, --help     Show this help message
`);
  process.exit(0);
}

function installTo(targetDir, label) {
  const destDir = path.join(targetDir, SKILL_NAME);
  fs.mkdirSync(destDir, { recursive: true });
  const destFile = path.join(destDir, 'SKILL.md');
  fs.copyFileSync(SOURCE_SKILL_MD, destFile);
  console.log(`  ✓ Installed to ${label}: ${destFile}`);
}

console.log(`\n🚀 Installing "${SKILL_NAME}" skill...\n`);

let installedAny = false;

if (isGlobal || isAll) {
  const home = os.homedir();
  const geminiDir = path.join(home, '.gemini', 'config', 'skills');
  const agentsDir = path.join(home, '.agents', 'skills');

  installTo(geminiDir, 'Antigravity Global');
  installTo(agentsDir, 'Universal Agents Global');
  installedAny = true;
}

if (!isGlobal || isAll) {
  const localDir = path.join(process.cwd(), '.agents', 'skills');
  installTo(localDir, 'Current Project (.agents/skills)');
  installedAny = true;
}

console.log(`
🎉 Skill successfully installed!
Your AI agents (Antigravity, Claude Code, Cursor, Copilot CLI, Codex) can now automatically discover and use this skill.

Trigger it anytime with:
  /layered-domain-architecture
`);

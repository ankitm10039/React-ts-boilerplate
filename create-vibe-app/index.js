#!/usr/bin/env node

import { execSync } from 'child_process';
import prompts from 'prompts';
import degit from 'degit';

async function init() {
  console.log('⚡ Welcome to VibeApp CLI Bootstrapper ⚡\n');

  // 1. Get project name from command line argument or prompt
  let targetDir = process.argv[2];
  
  if (!targetDir) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Enter your new project name:',
      initial: 'vibe-app-project'
    });
    targetDir = response.projectName;
  }

  if (!targetDir) {
    console.log('Setup cancelled.');
    return;
  }

  console.log(`\n🚀 Downloading React + TS + MUI Template into ./${targetDir}...`);

  // 2. Clone using degit from your feature branch
  const emitter = degit('ankitm10039/React-ts-boilerplate#feature/setup', {
    cache: false,
    force: true,
  });

  emitter.on('info', info => {
    console.log(`• ${info.message}`);
  });

  try {
    await emitter.clone(targetDir);
    console.log('\n✅ Download complete.');
    
    console.log('\n📦 Installing project dependencies (running npm install)...');
    
    // 3. Install dependencies inside the new folder
    execSync(`cd ${targetDir} && npm install --legacy-peer-deps`, { stdio: 'inherit' });

    console.log(`\n🎉 Success! Your project is ready to run.`);
    console.log(`To start your application:`);
    console.log(`  cd ${targetDir}`);
    console.log(`  npx vite`);
  } catch (err) {
    console.error('\n❌ Error cloning repository:', err.message);
  }
}

init().catch(console.error);

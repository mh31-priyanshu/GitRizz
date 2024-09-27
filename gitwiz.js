#!/usr/bin/env node
import inquirer from 'inquirer';
import { execSync } from 'child_process';

// Function to execute shell commands
const runCommand = (command) => {
  try {
    const output = execSync(command, { stdio: 'inherit' });
    console.log(output.toString());
  } catch (error) {
    console.error(`Error executing command: ${command}\n${error}`);
  }
};

// Questions to prompt the user
const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What Git action would you like to perform?',
    choices: ['Commit', 'Push', 'Create Branch', 'Checkout Branch', 'Status', 'Pull'],
  },
  {
    type: 'input',
    name: 'branchName',
    message: 'Enter the branch name (if applicable):',
    when: (answers) => answers.action === 'Create Branch' || answers.action === 'Checkout Branch',
  },
  {
    type: 'input',
    name: 'commitMessage',
    message: 'Enter the commit message:',
    when: (answers) => answers.action === 'Commit',
  },
];

// Main logic for executing Git commands based on user input
inquirer.prompt(questions).then((answers) => {
  const { action, branchName, commitMessage } = answers;

  switch (action) {
    case 'Commit':
      runCommand(`git add . && git commit -m "${commitMessage}"`);
      break;
    case 'Push':
      runCommand('git push');
      break;
    case 'Create Branch':
      runCommand(`git checkout -b ${branchName}`);
      break;
    case 'Checkout Branch':
      runCommand(`git checkout ${branchName}`);
      break;
    case 'Status':
      runCommand('git status');
      break;
    case 'Pull':
      runCommand('git pull');
      break;
    default:
      console.log('Invalid action');
  }
});

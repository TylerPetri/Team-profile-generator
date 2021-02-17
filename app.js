const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

async function manager() {
  const manager = await inquirer.prompt([
    {
      message: "What is your name?",
      name: "name",
    },
    {
      message: "What is your employee ID number?",
      name: "id",
    },
    {
      message: "What is your email?",
      name: "email",
    },
    {
      message: "What is your office number?",
      name: "officeNumber",
    },
  ]);

  const newM = new Manager(
    manager.name,
    manager.id,
    manager.email,
    manager.officeNumber
  );
  employees.push(newM);
  fs.writeFileSync(outputPath, render(employees), "utf-8");

  askToAddAnother();
}

async function engineer() {
  const engineer = await inquirer.prompt([
    {
      message: "What the name of the engineer?",
      name: "name",
    },
    {
      message: "What is their ID number?",
      name: "id",
    },
    {
      message: "What is their email?",
      name: "email",
    },
    {
      message: "What is their github profile?",
      name: "github",
    },
  ]);

  const newE = new Engineer(
    engineer.name,
    engineer.id,
    engineer.email,
    engineer.github
  );
  employees.push(newE);
  fs.writeFileSync(outputPath, render(employees), "utf-8");

  askToAddAnother();
}

async function intern() {
  const intern = await inquirer.prompt([
    {
      message: "What is the name of the intern?",
      name: "name",
    },
    {
      message: "What is their ID number?",
      name: "id",
    },
    {
      message: "What is their email?",
      name: "email",
    },
    {
      message: "What school do they attend?",
      name: "school",
    },
  ]);

  const newI = new Intern(
    intern.name, 
    intern.id, 
    intern.email, 
    intern.school
  );
  employees.push(newI);
  fs.writeFileSync(outputPath, render(employees), "utf-8");

  askToAddAnother();
}

async function askToAddAnother() {
  const again = await inquirer.prompt([
    {
      type: "list",
      choices: ["More engineers!", "More interns!", "Exit"],
      name: "add",
    },
  ]);

  switch (again.add) {
    case "More engineers!":
      engineer();
      break;
    case "More interns!":
      intern();
      break;
    case "Exit":
      console.log("Your site is ready!");
      break;
  }
}

manager();
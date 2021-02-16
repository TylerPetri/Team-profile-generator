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
      message: "What is your github profile?",
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
      message: "What school do you attend?",
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
      choices: ["Add another engineer", "Add another intern", "Exit"],
      name: "add",
    },
  ]);

  switch (again.add) {
    case "Add another engineer":
      engineer();
      break;
    case "Add another intern":
      intern();
      break;
    case "Exit":
      console.log("Your site is ready!");
      break;
  }
}

manager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

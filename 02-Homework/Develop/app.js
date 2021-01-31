const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

function newExecute() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "employeeType",
        message: "Please select a role for this team member?",
        choices: ["Manager", "Intern", "Engineer"],
      },
    ])
    .then((data) => {
      const typeChecker = data.employeeType.toString();
      if (typeChecker === "Manager") {
        getManager();
      } else if (typeChecker === "Engineer") {
        getEngineer();
      } else if (typeChecker === "Intern") {
        getIntern();
      }
    });
}

function addNewMember() {
  inquirer
    .prompt([
      {
        name: "addNewMember",
        type: "confirm",
        message: "Do you want to add another team member?",
      },
    ])
    .then((data) => {
      if (data.addNewMember === true) {
        newExecute();
      } else {
        renderHTML();
      }
    });
}

function getManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is their employer ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is their email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is their office number?",
        name: "officeNumber",
      },
    ])
    .then((data) => {
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      team.push(manager);
      addNewMember();
    });
}

function getEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is their employer ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is their email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is their github username?",
        name: "GitHub",
      },
    ])
    .then((data) => {
      const engineer = new Engineer(
        data.name,
        data.id,
        data.email,
        data.GitHub
      );
      team.push(engineer);
      addNewMember();
    });
}

function getIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the intern name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is their employer ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is their email?",
        name: "email",
      },
      {
        type: "input",
        message: "What school are they attending?",
        name: "school",
      },
    ])
    .then((data) => {
      const intern = new Intern(data.name, data.id, data.email, data.school);
      team.push(intern);
      addNewMember();
    });
}

function renderHTML() {
  fs.writeFileSync(outputPath, render(team), "utf-8");
}

newExecute();

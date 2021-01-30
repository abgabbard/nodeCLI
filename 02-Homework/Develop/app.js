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

function newMember() {
    inquirer.prompt([
        {
            type: "checkbox",
            name: "employeeType",
            message: "What is your role at the company?",
            choices: ["Manager", "Intern", "Engineer"],    
        },
    ]).then((data) => {
        if (data.employeeType === "manager") {
            getManager();
        } else if (data.employeeType === "engineer") {
            getEngineer();
        } else if (data.employeeType === "intern") {
            getIntern();
        }
    })
}
newMember(); 

function getManager() {
inquirer.prompt([
    {
        type: "input",
        message: "What is your employer ID?",
        name: "ID",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "Email",
      },
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
]).then((data) => {
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    team.push(manager);
})};

function getEngineer() {
inquirer.prompt([
    {
        type: "input",
        message: "What is your employer ID?",
        name: "ID",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "Email",
      },
      {
        type: "input",
        message: "What is your github username?",
        name: "GitHub",
      },
]).then((data) => {
    const engineer = new Engineer(data.name, data.id, data.email, data.GitHub);
    team.push(engineer);
    addNewMember();
})};

function getIntern() {
inquirer.prompt([
    {
        type: "input",
        message: "What is your employer ID?",
        name: "ID",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "Email",
      },
      {
        type: "input",
        message: "What school are you attending?",
        name: "school",
      },
]).then((data) => {
    const intern = new Intern(data.name, data.id, data.email, data.school);
    team.push(intern);
    addNewMember();
})}


function addNewMember() {
  inquirer
  .prompt([
    {
      name: "addNewMember",
      type: "confirm",
      message: "Do you want to add another team member?",
    },
  ])
  .then((data) => { if (data.type === true) {
      newMember();
  } else {
      renderHtml();
  }; 
  });
}


function renderHtml() {
    fs.writeFileSync(outputPath, render(team), "utp-8");
    };

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

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

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the team members name.",
        name: "memberName",
      },
      {
        type: "list",
        message: "Select the team members role",
        choices: ["Manager", "Engineer", "Intern"],
        name: "memberTitle",
      },
      {
        type: "input",
        message: "Enter the employee ID",
        name: "memberId",
      },
      {
        type: "input",
        message: "Enter the employee email",
        name: "employeeEmail",
      },
    ])
    .then(function ({ memberName, memberTitle, memberId, employeeEmail }) {
      let roleInfo = "";
      if (memberTitle === "Manager") {
        roleInfo = "office number";
      } else if (memberTitle === "Engineer") {
        roleInfo = "GitHub Name";
      } else {
        roleInfo = "name of School";
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: `Please enter the team members ${roleInfo}`,
            name: "roleInformation",
          },
          {
            type: "list",
            message: "Would you like to add another team member?",
            choices: ["Yes", "No"],
            name: "anotherTeamMember",
          },
        ])
        .then(function ({ roleInformation, anotherTeamMember }) {
          let newTeamMember;
          if (memberTitle === "Manager") {
            newTeamMember = new Manager(
              memberName,
              memberId,
              employeeEmail,
              roleInformation
            );
          } else if (memberTitle === "Engineer") {
            newTeamMember = new Engineer(
              memberName,
              memberId,
              employeeEmail,
              roleInformation
            );
          } else {
            newTeamMember = new Intern(
              memberName,
              memberId,
              employeeEmail,
              roleInformation
            );
          }
          team.push(newTeamMember);
          if (anotherTeamMember === "Yes") {
            addTeamMember();
          } else {
            console.log(team);
            fs.writeFile(outputPath, render(team), function(err){
                if(err) throw(err);
                console.log("worked")
            })
          };
        });
    });
}

addTeamMember();


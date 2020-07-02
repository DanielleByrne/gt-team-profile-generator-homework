const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function addTeamMember (){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the team members name.",
            name: "memberName"
        },
        {
            type: "list",
            message: "Select the team members role",
            choices: ["Manager", "Engineer", "Intern"],
            name: "memberTitle"
        },
        {
            type: "input",
            message: "Enter the employee ID",
            name: "memberId"
        },
        {
            type: "input",
            message: "Enter the employee email",
            name: "employeeEmail"
        }
    ]).then(function({memberName, memberTitle, memberId, employeeEmail}){
        let roleInfo = ""
        if(memberTitle === "Manager"){
            roleInfo = "office number"
        }else if( memberTitle === "Engineer"){
            roleInfo = "GitHub Name"
        }else{
            roleInfo = "name of School"
        }
        inquirer.prompt([
            {
                type: "input",
                message: `Please enter the team members ${roleInfo}`,
                name: "roleInformation"
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                choices: ["Yes", "No"],
                name: "newTeamMember"
            }
        ]).then(function({roleInformation, newTeamMember}){
            let newTeamMember;
            if(memberTitle === "Manager"){
                newTeamMember = new Manager(memberName, memberId, employeeEmail, roleInformation)
            } else if(memberTitle === "Engineer"){
                newTeamMember = new Engineer(memberName, memberId, employeeEmail, roleInformation)
            }else{
                newTeamMember = new Intern(memberName, memberId, employeeEmail, roleInformation)
            }
        });
    });
    
}


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

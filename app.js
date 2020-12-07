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

function teamCreate () {

    //This first function will create the team manager.
    function createManager (){
        inquirer
            .prompt([
                {
                    type:'input',
                    name:'name',
                    message:"Name of manager",
                    validate: function (answer) {
                        if(answer === "" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(answer) === true || /\d/.test(answer) === true) {
                            return "Please enter a name for the manager, no special characters, or numbers. If you see this error correct the last mistake and press enter when done";
                        } return true;
                    }
                },
                {
                    type:"input",
                    name: "id",
                    message:"Enter an id for the manager",
                    validate: function (answer) {
                        if (answer === "") {
                            return"Please enter an ID";
                        } return true;
                    }
                },
                {
                    type:"input",
                    name: "manageremail",
                    message: "Enter an email address for the manager",
                    validate: function (answer) {
                        if (answer === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(answer)===false) {
                            return "Enter a valid email address. If you see this error correct the mistake and press enter when done";
                        } return true;
                    }
                },
                {
                    type:"input",
                    name:"officenumber",
                    message:"Enter the office number for the manager",
                    validate: function (answer) {
                        if (answer === "" || /[a-zA-Z]/g.test(answer) === true || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(answer) === true ) {
                            return "Please enter a valid office number, no letters or special characters. If you see this error correct the mistake and press enter when done";
                        } return true;
                    }
                },
            ])
            .then(answer => {
                const manager = new Manager(answer.name, answer.id, answer.manageremail, answer.officenumber)
                team.push(manager);
                console.log(team);
                addMembers();
            })
    }

    // This function will be used to create the team engineer(s).
    function createEngineer () {
        inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message:"Enter the name of your engineer",
                validate: function (answer) {
                    if(answer === "" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(answer) === true || /\d/.test(answer) === true) {
                        return "Please enter a name for the manager, no special characters, or numbers. If you see this error correct the last mistake and press enter when done";
                    } return true;
                }
            },
            {
                type: "input",
                name: "id",
                message:"Enter an id for the engineer",
                validate: function (answer) {
                    if (answer === "") {
                        return "Please enter an ID";
                    } return true;
                }
            },
            {
                type: "input",
                name: "engineeremail",
                message: "Enter an email address for the engineer",
                validate: function (answer) {
                    if (answer === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(answer)===false) {
                        return "Enter a valid email address. If you see this error correct the last mistake and press enter when done";
                    } return true;
                }
            },
            {
                type: "input",
                name: "github",
                message: "Enter the engineer github username",
                validate: function (answer) {
                    if (answer === "") {
                        return "Please enter a github username, it cannot be empty.";
                    } return true;
                }
            }
        ])
        .then(answer => {
            const engineer = new Engineer(answer.name, answer.id, answer.engineeremail, answer.github);
            team.push(engineer);
            console.log(team);
            addMembers();
        })
    }
    
    // This next function will create the team intern(s).
    function createIntern () {
        inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message:"Enter the name of your intern.",
                validate: function (answer) {
                    if(answer === "" || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(answer) === true || /\d/.test(answer) === true) {
                        return "Please enter a name for the manager, no special characters, or numbers. If you see this error correct the last mistake and press enter when done";
                    } return true;
                }
            },
            {
                type: "input",
                name: "id",
                message:"Enter an id for the intern.",
                validate: function (answer) {
                    if (answer === "") {
                        return "Please enter an ID";
                    } return true;
                }
            },
            {
                type: "input",
                name: "internemail",
                message: "Enter an email address for the intern.",
                validate: function (answer) {
                    if (answer === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(answer)===false) {
                        return "Enter a valid email address. If you see this error correct the last mistake and press enter when done";
                    } return true;
                }
            },
            {
                type: "input",
                name: "school",
                message: "Enter the school your intern is attending.",
                validate: function (answer) {
                    if (answer === "") {
                        return "Please enter the name of the school your intern is currently attending.";
                    } return true;
                }
            }
        ])
        .then(answer => {
            const engineer = new Intern(answer.name, answer.id, answer.internemail, answer.school);
            team.push(engineer);
            console.log(team);
            addMembers();
        })
    }

    function addMembers() {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "moremembers",
                    message: "Please select which team members do you want to add? Select none if you don't want to keep adding members",
                    choices: ["Engineer", "Intern", "None"]
                }
            ])
            .then(answer => {
                switch(answer.moremembers) {
                    case "Engineer": 
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    case "None":
                        fs.writeFile(outputPath,render(team), err => {
                            err?console.log(err):console.log("success");
                        })
                        break;
                }
            })
            
    }
    createManager();
}
teamCreate();

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// creates output directory for html file
fs.mkdir("./output", function(err){ 
    if (err) { 
        console.log(err)
    } else {}
})

// template builder for team.html
const render = require("./lib/htmlRenderer");
let teamMembers = [];


// validates prompt answers are entered
function validAnswer(name) { 
    return name !== "" || "Please answer the question."; 
}

// validates that input is an email address
function validEmail(name) { 
    var emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    return emailRegex.test(name) || "Please enter a valid email address."; 
     // returns a boolean 
}

// validates that number inputs are integers
function validNumber(name){ 
    var integerRegex = /^\d+$/; 
    return integerRegex.test(name) || "Please enter a number."; 
}



// kicks off app and starts with manager build 
function appMenu() {
    function createManager() {
        console.log("Please build your team");

        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: validAnswer,
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id",
                validate: validNumber,
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email address?",
                validate: validEmail,
            },
            {
                type: "input",
                name: "managerOfficeNum",
                message: "What is your manager's office number?",
                validate: validNumber,
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            teamMembers.push(manager);
            renderTeam();
            render(teamMembers);
            console.log(teamMembers);
            addMembers();
            
        });
    };

    createManager();
}

appMenu();



function addMembers() {
    inquirer.prompt([
        {
            type: "list", 
            name: "addAMember", 
            message: "Would you like to add any more members?",
            choices: [
                "Engineer", 
                "Intern", 
                "No thanks, this is my whole team."
            ]}    
    ]).then(data => {
        switch (data.addAMember) {

            case "Engineer":
              addEngineer(); 
              break;
          
            case "Intern":
              addIntern(); 
              break;
          
            case "No thanks, this is my whole team.":
              renderTeam();
            }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: validAnswer,
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id",
            validate: validNumber,
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email address?",
            validate: validEmail,
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github username?",
            validate: validAnswer,
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        renderTeam();
        render(teamMembers);
        console.log(teamMembers);
        addMembers();
        
    });
};


function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
            validate: validAnswer,
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's id",
            validate: validNumber,
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email address?",
            validate: validEmail,
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school is your intern attending?",
            validate: validAnswer,
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        renderTeam();
        render(teamMembers);
        console.log(teamMembers);
        addMembers();
        
    });
};



renderTeam = () => {
    console.log(teamMembers);
    const html = render(teamMembers);
    // console.log(html);
    fs.writeFile('./output/team.html', html, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
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

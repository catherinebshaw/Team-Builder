const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function getManager() {
    console.log( ` getting manager info  `) 
        var manager = await inquirer.prompt(
        [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the manager ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email address of the manager?',
        },
        {
            type: 'input',
            name: 'officenumber',
            message: 'What office is the manager associated with?',
        }, 
    ])
    console.log(manager)

    // We need to create our new Manager Object
    var newManager = new Manager(manager.name, manager.id, manager.email, manager.officenumber);
    team.push(newManager);
    addMember()
}

async function addMember() {
var next = await inquirer.prompt(
    [
        { 
        type: 'list',
        name: 'member',
        message: 'What type of team member would you like to add next?',
        choices:['Intern', 'Engineer', 'I am done creating my team']
        },
    ])

    if(next.member == 'Intern'){
            getIntern();
        }else if (next.member == 'Engineer'){
            getEngineer();
        }else {
            console.log(team)
            generateOutput()
    }   
}

async function getIntern() {
    console.log( ` building Intern info  `)
        
        var intern = await inquirer.prompt(
        [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Intern?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the Intern ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email address of the Intern?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did the Intern attend?',
        },
    ])
    console.log( intern )

    // Create  new Intern Object
    var newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
    
    // Add the new Object to the TEAM ARRAY
    team.push(newIntern);
    addMember()
}

async function getEngineer() {
    console.log( ` building Engineer info  `)
        
        var engineer = await inquirer.prompt(
        [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Engineer?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the Engineer ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email address of the Engineer?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the Engineer Github Username?',
        },
    ])

    console.log( engineer )
    
    // Create  new Engineer Object
    var newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
    
    // Add the new Object to the TEAM ARRAY
    team.push(newEngineer);
    addMember()
}
console.log(team)

function generateOutput(){
    
    const output = render ( team )

    //write to a file(writeFileSync)
    fs.writeFileSync(outputPath, output)


}

getManager()

    
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

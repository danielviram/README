const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { async } = require('rxjs');

const writeFileAsync = until.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Whats is the title of your project?"
        },

        {
            type: "input",
            name: "description",
            message: "Write a detailed description of your project?"
        },
        {
            type: "input",
            name: "installation",
            message: "Installation Instructions"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you use your project?"
        },
        {
            type: "input",
            name: "contribution",
            message: "How can you contribute?"
        },
        {
            type: "input",
            name: "test",
            message: "Run test here"
        },
        {
            type: "checkbox",
            name: "license",
            message: "Choose a License.",
            choices:[
                "MIT",
                "ISC",
                "Apache",
                "GNU GPLv3"
            ],
        },

        {
            type: "input",
            name: "username",
            message: "What is your github username?"
        },
 
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
    ]);
};


function generateMarkdown(responce){
    return `
    # ${responce.title}
    # Table of Contents 
    -[Description](#description)
    -[Installation](#installation)
    -[USage](#usage)
    -[Contributing](#contributing)
    -[Test](#test)
    -[Credits](#credits)
    -[License](#license)
    -[Questions](@questions)

    ## Description:
    ![License](https://img.shields.io/badge/license-${responce.license}-blue.svg "License Badge")
    ${responce.description}

    ## nstallation:
    ${responce.installation}

    ## Usage:
    ${responce.usage}

    ## Test:
    ${responce.test}

    ## License:
        For more information about the License, click on the link below .
        -[License](https://opensource.org/licenses/${responce.license})
    
    ## Questions:
        For questions about the generator you can go to my page at the following link:
        - [GitHub Profile](https://github.com/${responce.username})

        For additional questions please reach out to my email at ${responce.email}.
    
    `;
};

async function init(){
    try{
        const responce = await promptUser();

        const readMe = generateMarkdown(responce);
        await writeFileAsync("README.md", readMe);
        console.log("Success!");
    } catch(err){
        console.log(err);
    }

}


init();
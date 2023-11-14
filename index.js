const db = require("./db/connection")
const inquirer = require("inquirer")

function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View Departments", "View Roles", "View Employees", "Add a Department", "Add a Role",
                "Add an Employee", "Update an Employee", "Quit"]
        }
    ]).then((answer) => {
        switch (answer.options) {
            case "View Departments":
                viewDepartments()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "Add a Role":
                addRole()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "Update an Employee":
                updateEmplpyee()
                break;
            default:
                db.end()
                break;
        }
    })
}

function viewDepartments(){
    const query= "SELECT * FROM department"
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        init()
    })
}

function viewRoles(){
    const query= 'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id= department.id'
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        init()
    })
}

function viewEmployees(){
    const query='SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name," ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id;'
    db.query(query, (err, data)=>{
        if(err) throw err;
        console.table(data)
        init()
    })
}
function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"Enter the name of the Department you would like to add:"
        }
    ]).then((department)=>{
        const query= "INSERT INTO department(name) VALUES (?)"
        db.query(query, department.name, (err, res)=>{
            if(err) throw err;
            console.log(`Added ${department.name}, to the Department Table`);
            viewDepartments()
        })
    })
}

function addRole(){
    db.query('SELECT * FROM department', (err, res)=>{
        let departments= res.map((department)=>({
            name:department.name,
            value:department.id
        }));

        inquirer.prompt([
            {
                type:"input",
                name:"title",
                message:"Enter the title of the new Role"
            },
            {
                type:"input",
                name:"salary",
                message:"Enter the salary fro new role:"
            },
            {
                type:"list",
                name:"departmentID",
                message:"Select the Department this new rol belongs to:",
                choices:departments
            }
        ]).then((role)=>{
            const query="INSERT INTO role SET ?"
            db.query(query, {
                title:role.title,
                salary:role.salary,
                department_id:role.departmentID
            },(err,res)=>{
                if(err) throw err; 
                console.log(`The ${role.title},was added to the role table`)
                viewRoles()
            })
        })
    })
}

function addEmployee(){
    db.query('SELECT * FROM role', (err, res)=>{
        let roles= res.map((role)=>({
            name:role.title,
            value:role.id
        }));

        db.query('SELECT * FROM employee', (err, res)=>{
            let managers= res.map((manager)=>({
                name:`${manager.first_name} ${manager.last_name}`,
                value:manager.id
            }));

            inquirer.prompt([
                {}
            ]).then((employee)=>{
                
            })

    })
    })

}

init()
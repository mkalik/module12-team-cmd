CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30),
)

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
)

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name  VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE SET NULL
    
)
    
    

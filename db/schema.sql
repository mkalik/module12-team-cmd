DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name  VARCHAR(30) ,
    last_name VARCHAR(30),
    role_id INT ,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES roles(id) ON DELETE SET NULL
);
    
    

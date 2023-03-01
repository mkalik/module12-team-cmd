INSERT into department(id,dept_name)
VALUES
    (1,"Engineering"),
    (2, "Advertising"),
    (3, "Social Media");

INSERT into roles(id, title, salary, dept_id)
VALUES
    (1, "Lead Engineer", 100000.00, 1),
    (2, "Junior Engineer", 60000.00,1),
    (3, "Head advertiser", 100000.00, 2),
    (4, "Junior advertiser",55000.00,2),
    (5, "Social media exec", 95000.00,3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "jim", "harbor", 1, null),
    (2, "jack", "heading", 2, 1),
    (3, "jill", "horsen", 3, null),
    (4, "jake", "huntser", 4, 3),
    (5, "jorge", "hoines", 5, null);

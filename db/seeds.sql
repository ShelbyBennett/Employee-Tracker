USE employee_db; 

INSERT INTO department(id,name)
VALUES
(1,"Human Resources"),
(2,"Marketing"),
(3,"Legal"),
(4,"Sales"),
(5,"Engineering");

INSERT INTO role(id,title,salary,department_id)
VALUES
(1,"Recruiter",50.000,1),
(2,"Senior Recruiter",75.000,1),
(3,"Designer",50.000,2),
(4,"Lead Designer",80.000,2),
(5,"Paralegal",55.000,3),
(6,"Lawyer",100.000,3),
(7,"Junior Developer",90.000,5),
(8,"Senior Developer",150.000,5),
(9,"Sales Associate",60.000,4),
(10,"Sales Lead",75.000,4);

INSERT INTO employee(id,first_name,last_name,role_id,manager_id)
VALUES
(1,"John","Smith",2,NULL),
(2,"Karen","Jones",4,NULL),
(3,"Nick","Brown",6,NULL),
(4,"Lisa","Roberts",8,NULL),
(5,"Faith","Lopez",10,NULL),
(6,"Doug","Freeland",1,1),
(7,"Ashely","Cortes",3,2),
(8,"Debbie","Lawson",5,3),
(9,"James","Wagner",7,4),
(10,"Victoria","Rivera",9,5);

UPDATE todolist
SET completed = 'N';

INSERT INTO todolist ("toDoItem", "completed")
VALUES ('Put on your supersuit and fight crime', 'N'),
('Plant and grow another Aubrey', 'N');

SELECT * FROM "todolist";

CREATE TABLE todolist (
	id serial PRIMARY KEY,
	"toDoItem" VARCHAR(200) NOT NULL,
	"completed" VARCHAR(1) NOT NULL
	);
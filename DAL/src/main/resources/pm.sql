/*Run all the DROP statements below in order to recreate all the tables*/
/*
drop table quests;
drop table badges;
drop table users;
*/

CREATE TABLE users(
	id serial,
	last_name varchar(255),
	first_name varchar(255),
	email varchar(255) not null unique,
	password varchar(255) not null,
	tokens int,
	CONSTRAINT pk_users PRIMARY KEY(id)
);

CREATE TABLE quests(
	id serial,
	task varchar(255) not null,
	correct_answer varchar(255) not null,
	answer varchar(255),
	tokens int not null,
	user_id int,
	CONSTRAINT fk_users_quests FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT pk_quests PRIMARY KEY(id)
);

CREATE TABLE badges(
	id serial,
	name varchar(255) not null,
	obtained_at varchar(255) not null,
	user_id int,
	CONSTRAINT fk_users_badges FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT pk_badges PRIMARY KEY(id)
);
/*Before executing this script(populate.sql), make sure you have previously executed the pm.sql script*/
/*Run all the ALTER statements below in order to avoid foreign key violations in the later DML statements*/
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE badges_id_seq RESTART WITH 1;
ALTER SEQUENCE quests_id_seq RESTART WITH 1;

insert into users(last_name, first_name, email, password, tokens)
values
('min', 'Ad', 'admin@gmail.com', 'admin', 0),
('Balogh', 'Luca', 'luca@gmail.com', 'luca', 0),
('Butincu', 'Filip', 'filip@gmail.com', 'filip', 0),
('Veres', 'Ben', 'ben@gmail.com', 'ben', 0);

insert into badges(name, obtained_at, user_id)
values
('Under a minute quest complete','29/03/2023 04:14:18', 2);

insert into quests(task, correct_answer, answer, tokens, user_id)
values
('Cate este 2 + 2 ?','4','', 10, 1),
('Cat este 192 + 188?','380', '', 15, 1),
('Cat e aria cercului','pi * r ^ 2', '', 25, 1),
('Care este cea mai rapida pasare terestra?','Strutul', '', 30, 1),
('Care sunt primele 4 zecimale ale lui pi?','1415', '', 50, 1),
('Ce animal face Meow','Pisica', '', 5, 1);





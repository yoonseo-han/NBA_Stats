-- Table to store team related information

DROP TABLE IF EXISTS `TEAM`;

CREATE TABLE TEAM (
    team_id integer not null primary key,
    team_name varchar(30) not null
);

INSERT INTO TEAM(team_id, team_name)
VALUES
(2, 'Boston Celtics'),
(6, 'Chicago Bulls');
drop table qs, ans, pics;
DROP DATABASE QNA;

CREATE DATABASE QNA;

CREATE TABLE qs(
  id SERIAL PRIMARY KEY,
  product_id int NOT NULL,
  body VARCHAR(1000),
  date_written bigint,
  asker_name CHAR(60),
  asker_email CHAR(60),
  reported int DEFAULT 0,
  helpful int DEFAULT 0
);

CREATE TABLE ans(
  id SERIAL PRIMARY KEY,
  question_id int references qs(id),
  body VARCHAR(1000),
  date_written new Date(bigint),
  answerer_name CHAR(60),
  answerer_email CHAR(60),
  reported int DEFAULT 0,
  helpful int DEFAULT 0
);

CREATE TABLE pics(
  id SERIAL PRIMARY KEY,
  answer_id int references ans(id),
  url VARCHAR(1000)
);

COPY qs FROM '/Users/elliehunt/Downloads/questions.csv'
DELIMITER ','
CSV HEADER;

COPY ans FROM '/Users/elliehunt/Downloads/answers.csv'
DELIMITER ','
CSV HEADER;

COPY pics FROM '/Users/elliehunt/Downloads/answers_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE countries ( id BIGINT(20) NOT NULL AUTO_INCREMENT,  name VARCHAR(255), visited BOOL NOT NULL,  notes TEXT,  facts TEXT,  date_visited DATE,  photos VARCHAR(255), user_id INT NOT NULL,  PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (user_id) );

CREATE TABLE bucketlist_countries(id INT NOT NULL AUTO_INCREMENT, country_name VARCHAR(255), facts TEXT, user_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (user_id));

CREATE TABLE visited_countries(id INT NOT NULL AUTO_INCREMENT, country_name VARCHAR(255), notes TEXT, date_visited DATE, user_id INT, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (user_id));

CREATE TABLE users( user_id INT NOT NULL AUTO_INCREMENT, username VARCHAR(50), PRIMARY KEY (user_id));
# Table user

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | User identification |
| pseudo | TEXT | NOT NULL | The username that is displayed publically |
| mail | TEXT | NOT NULL | User email |
| password | TEXT | NOT NULL | User password |
| avatar_url | TEXT | | Profile picture to be displayed on public sections |
| role | TEXT | | Authorization level (user or admin levels) |
| mail_sub | BOOLEAN | DEFAULT FALSE | authorization to be registered in mailing list |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table movie

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Movie identification |
| french_title | TEXT | NOT NULL | French title |
| original_title | TEXT | NOT NULL | Original title |
| poster_url | TEXT | NOT NULL | URL of the poster image |
| directors | TEXT ARRAY | NOT NULL | Array containing all directors (between 1 to many) |
| release_date | DATE | NOT NULL | The movie release date |
| duration | INT | NOT NULL | Movie duration (minutes) |
| casting | TEXT ARRAY | NOT NULL | First 5 actors from the cast |
| presentation | TEXT | NOT NULL | User description for this film |
| is_published | BOOLEAN | DEFAULT FALSE | Publication state, to distinguish movies already posted from pending propositions |
| publishing_date | TIMESTAMP | NOT NULL | Publishing date. Passed for a published one, future for a pending proposition |
| user_id | ENTITY | NOT NULL | User identifcation (foreign key) |
| season_id | ENTITY | NOT NULL | Season identification (foreign key) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table season

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Season identification |
| number | INTEGER | NOT NULL | Number of the season |
| year | DATE | NOT NULL | Year of the saison |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table country

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Country identification |
| name | TEXT | NOT NULL | Country Name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table movie_has_country

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| movie_id | ENTITY | PRIMARY KEY, NOT NULL | Movie identification (foreign key) |
| country_id | ENTITY | PRIMARY_KEY, NOT NULL | Country identification (foreign key) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table language

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Language identification |
| name | TEXT | NOT NULL | language name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |



# Table movie_has_language

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| movie_id | ENTITY | PRIMARY KEY, NOT NULL | Movie identification (foreign key) |
| language_id | ENTITY | PRIMARY_KEY, NOT NULL | Language identification (foreign key) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |



# Table genre

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Genre identification |
| name | TEXT | NOT NULL | Genre name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table movie_has_genre

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| movie_id | ENTITY | PRIMARY KEY, NOT NULL | Movie identification (foreign key) |
| genre_id | ENTITY | PRIMARY_KEY, NOT NULL | Language identification (foreign key) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table review

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Review identification |
| viewed | BOOLEAN | NOT NULL DEFAULT FALSE | Did the user see the movie ? |
| bookmarked | BOOLEAN | NOT NULL DEFAULT FALSE | Did the user fav the movie ? |
| liked | BOOLEAN | NOT NULL DEFAULT FALSE | Did the user like the movie ? |
| rating | INT | DEFAULT NULL | User rating on five |
| comment | TEXT | DEFAULT NULL | User comment |
| movie_id | ENTITY | NOT NULL | Movie(id) identification |
| user_id | ENTITY | NOT NULL | User(id) identification |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |


# Table journal

| Column | Type | Specifications / Constraints | Description |
| ----- | ---- | ------------ | ----------- |
| id | INTEGER | PRIMARY KEY, NOT NULL | Journal identification |
| log | TEXT | NOT NULL | Log of action |
| review_id | ENTITY | NOT NULL | Review(id) identification |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation date |
| updated_at | TIMESTAMP | | Modification date |
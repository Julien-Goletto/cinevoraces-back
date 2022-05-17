-- Deploy cinevoraces:version_6 to pg

BEGIN;

CREATE INDEX country_idx ON country USING btree (id);
CREATE INDEX genre_idx ON genre USING btree (id);
CREATE INDEX language_idx ON language USING btree (id);
CREATE INDEX movie_idx ON movie USING btree (id);
CREATE INDEX movie_has_country_idx ON movie_has_country USING btree (movie_id,country_id);
CREATE INDEX movie_has_genre_idx ON movie_has_genre USING btree (movie_id,genre_id);
CREATE INDEX movie_has_language_idx ON movie_has_language USING btree (movie_id,language_id);
CREATE INDEX review_idx ON review USING btree (movie_id,user_id);
CREATE INDEX season_idx ON season USING btree (id);
CREATE INDEX user_idx ON "user" USING btree (id);

COMMIT;

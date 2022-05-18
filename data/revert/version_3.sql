-- Revert cinevoraces:version_3 from pg

BEGIN;

DROP VIEW IF EXISTS global_metrics;
DROP VIEW IF EXISTS indiv_actions_metrics;
DROP VIEW IF EXISTS pending_propositions;
DROP VIEW IF EXISTS last_season_movies;
DROP VIEW IF EXISTS movies_infos CASCADE;
DROP VIEW IF EXISTS filters_options;
DROP VIEW IF EXISTS movie_comments CASCADE;
DROP VIEW IF EXISTS next_propositions CASCADE;

COMMIT;

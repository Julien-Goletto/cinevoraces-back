-- Revert cinevoraces:version_3 from pg

BEGIN;

DROP VIEW global_metrics;
DROP VIEW indiv_actions_metrics;
DROP VIEW pending_propositions;
DROP VIEW last_season_movies;
DROP VIEW movies_infos CASCADE;
DROP VIEW filters_options;

COMMIT;

-- Verify cinevoraces:version_3 on pg

BEGIN;

SELECT seasons_count FROM global_metrics;
SELECT comments_count FROM indiv_actions_metrics;
SELECT poster_url FROM movies_infos;
SELECT "user_id" FROM pending_propositions;
SELECT "episode" FROM next_propositions;

ROLLBACK;

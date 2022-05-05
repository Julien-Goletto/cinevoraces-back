-- Revert cinevoraces:version_3 from pg

BEGIN;

DROP VIEW global_metrics;
DROP VIEW indiv_actions_metrics;
DROP VIEW pending_propositions;
-- DROP VIEW movies_infos CASCADE;

COMMIT;

-- Revert cinevoraces:version_5 from pg

BEGIN;

DROP TRIGGER IF EXISTS update_ua_fields_user ON "user";
DROP TRIGGER IF EXISTS update_ua_fields_movie ON "movie";
DROP TRIGGER IF EXISTS update_ua_fields_review ON "review";
DROP FUNCTION IF EXISTS fill_updated_at;

COMMIT;

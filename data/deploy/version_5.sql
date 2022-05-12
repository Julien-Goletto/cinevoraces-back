-- Deploy cinevoraces:version_5 to pg

BEGIN;

CREATE FUNCTION fill_updated_at()
	RETURNS TRIGGER AS $$
	BEGIN
		NEW.updated_at = NOW();
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ua_fields_user
BEFORE UPDATE ON "user"
	FOR EACH ROW
	EXECUTE FUNCTION fill_updated_at();
CREATE TRIGGER update_ua_fields_movie
BEFORE UPDATE ON "movie"
	FOR EACH ROW
	EXECUTE FUNCTION fill_updated_at();
CREATE TRIGGER update_ua_fields_review
BEFORE UPDATE ON "review"
	FOR EACH ROW
	EXECUTE FUNCTION fill_updated_at();

COMMIT;

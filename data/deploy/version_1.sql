-- Deploy cinevoraces:version_1 to pg

BEGIN;

CREATE TABLE "genre"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE  "language" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE  "country" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE "season"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "number" INTEGER NOT NULL UNIQUE,
  "year" INTEGER NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE  "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" TEXT NOT NULL UNIQUE,
  "mail" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "avatar_url" TEXT,
  "mail_sub" BOOLEAN DEFAULT 'false',
  "role" TEXT NOT NULL DEFAULT 'user',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ 
);
CREATE TABLE "movie"(
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "french_title" TEXT NOT NULL,
  "original_title" TEXT NOT NULL,
  "poster_url" TEXT NOT NULL,
  "directors" TEXT[] NOT NULL,
  "release_date" DATE NOT NULL,
  "runtime" INTEGER NOT NULL,
  "casting" TEXT[] NOT NULL,
  "presentation" TEXT NOT NULL,
  "is_published" BOOLEAN DEFAULT 'false',
  "publishing_date" DATE NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "season_id" INTEGER NOT NULL REFERENCES "season"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);
CREATE TABLE  "review" (
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "bookmarked" BOOLEAN NOT NULL DEFAULT 'false',
  "viewed" BOOLEAN NOT NULL DEFAULT 'false',
  "liked" BOOLEAN NOT NULL DEFAULT 'false',
  "rating" INTEGER,
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  PRIMARY KEY ("user_id", "movie_id")
);
CREATE TABLE "movie_has_genre" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "genre_id" INTEGER NOT NULL REFERENCES "genre"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","genre_id")
);
CREATE TABLE "movie_has_country" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "country_id" INTEGER NOT NULL REFERENCES "country"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","country_id")
);
CREATE TABLE "movie_has_language" (
  "movie_id" INTEGER NOT NULL REFERENCES "movie"("id") ON DELETE CASCADE,
  "language_id" INTEGER NOT NULL REFERENCES "language"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("movie_id","language_id")
);

CREATE TABLE "proposition_slot" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_number" INTEGER NOT NULL REFERENCES "season"("number"),
  "episode" INTEGER NOT NULL,
  "publishing_date" DATE NOT NULL,
  "is_booked" BOOLEAN DEFAULT 'false'
  );

COMMIT;

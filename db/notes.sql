-- This is required to generate UUIDs automatically for the 'id' column.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

-- This function will be called by a trigger whenever a row in the 'notes' table is updated.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop the trigger first if it exists to make this script idempotent (runnable multiple times without error).
DROP TRIGGER IF EXISTS update_notes_updated_at ON notes;
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add an index to the "updatedAt" column for faster sorting,
-- as the getNotes() service function orders by this column. This improves query performance.
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes("updatedAt" DESC);

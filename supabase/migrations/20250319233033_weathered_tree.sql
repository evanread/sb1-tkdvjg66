/*
  # Create leads tracking system

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `community_name` (text)
      - `hoa_size` (integer)
      - `created_at` (timestamp)
      - `notified` (boolean)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to read leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  community_name text NOT NULL,
  hoa_size integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  notified boolean DEFAULT false
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert new leads
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view leads
CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create an edge function to handle email notifications
CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- This will be handled by Supabase Edge Functions
  -- The actual email sending logic will be in a separate edge function
  NEW.notified := true;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger the notification when a new lead is inserted
CREATE TRIGGER on_new_lead
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_lead();
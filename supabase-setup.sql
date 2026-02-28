-- =============================================
-- R&B Rajh Holding AG - Supabase Database Setup
-- Domain: rbrajhholding.ch
-- =============================================

-- =============================================
-- 1. CREATE TEAMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT '',
    company VARCHAR(255) DEFAULT '',
    image_url TEXT DEFAULT '',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If table already exists, add company column:
-- ALTER TABLE teams ADD COLUMN IF NOT EXISTS company VARCHAR(255) DEFAULT '';

-- If role was NOT NULL, make it optional:
-- ALTER TABLE teams ALTER COLUMN role DROP NOT NULL;
-- ALTER TABLE teams ALTER COLUMN role SET DEFAULT '';

-- Enable Row Level Security for teams
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Public can read team members
CREATE POLICY "Allow public read access on teams" ON teams
    FOR SELECT USING (true);

-- Authenticated users can manage teams
CREATE POLICY "Allow authenticated users to insert teams" ON teams
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update teams" ON teams
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete teams" ON teams
    FOR DELETE TO authenticated
    USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_teams_order ON teams(order_index);


-- =============================================
-- 2. CREATE CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous/public users) can submit a contact form
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users can read contact submissions
CREATE POLICY "Allow authenticated read on contact_submissions" ON contact_submissions
    FOR SELECT TO authenticated
    USING (true);

-- Only authenticated users can update contact submissions
CREATE POLICY "Allow authenticated update on contact_submissions" ON contact_submissions
    FOR UPDATE TO authenticated
    USING (true);

-- Only authenticated users can delete contact submissions
CREATE POLICY "Allow authenticated delete on contact_submissions" ON contact_submissions
    FOR DELETE TO authenticated
    USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);


-- =============================================
-- 3. CREATE ADMIN USER (Run in Supabase Dashboard)
-- =============================================
-- NOTE: Admin user creation must be done through the Supabase Dashboard
-- Go to: Authentication > Users > Add User
--
-- Email: admin@rbrajhholding.ch
-- Password: RBHolding2024!
--
-- Make sure to:
-- 1. Disable email confirmation OR confirm the email manually
-- 2. Go to Authentication > Settings > Turn off "Confirm email"
--    OR use the "Confirm" button next to the user in Users list


-- =============================================
-- 4. OPTIONAL: INSERT SAMPLE TEAM MEMBERS
-- =============================================
-- Uncomment and run if you want sample data

-- INSERT INTO teams (name, role, company, image_url, order_index) VALUES
-- ('Suyarajh Kanagaratnam', 'Gründer, Vorstandsmitglied & Geschäftsführer', 'R&B Rajh Holding AG', '', 1),
-- ('Team Member 2', 'Position', 'Company Name', '', 2);


-- =============================================
-- 5. OPTIONAL: VIEW TABLE DATA
-- =============================================
-- SELECT * FROM teams ORDER BY order_index;
-- SELECT * FROM contact_submissions ORDER BY created_at DESC;


-- =============================================
-- 6. USEFUL QUERIES
-- =============================================

-- Count new contact submissions
-- SELECT COUNT(*) FROM contact_submissions WHERE status = 'new';

-- Get contact submissions with pagination
-- SELECT * FROM contact_submissions 
-- ORDER BY created_at DESC 
-- LIMIT 10 OFFSET 0;

-- Update contact submission status
-- UPDATE contact_submissions SET status = 'read', updated_at = NOW() WHERE id = 'UUID_HERE';

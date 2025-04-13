-- Add scheduled_time column to current_assignments table
ALTER TABLE current_assignments
ADD COLUMN scheduled_time TIMESTAMP WITH TIME ZONE; 
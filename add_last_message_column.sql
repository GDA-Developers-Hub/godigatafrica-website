-- Add last_message column to chat_rooms table
ALTER TABLE chat_rooms 
ADD COLUMN last_message VARCHAR(255) DEFAULT NULL;

-- Update existing chat rooms with their last message
UPDATE chat_rooms cr
SET last_message = (
    SELECT content 
    FROM chat_messages cm
    WHERE cm.room_id = cr.id
    ORDER BY created_at DESC 
    LIMIT 1
);

-- Create index for better performance
CREATE INDEX idx_chat_rooms_last_message ON chat_rooms(last_message(50)); 
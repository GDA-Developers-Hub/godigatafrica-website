-- CREATE DATABASE chat_interface;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
  id VARCHAR(36) PRIMARY KEY, 
  user_id VARCHAR(36) NULL,  
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id VARCHAR(36),
  role ENUM('user', 'assistant', 'system') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE TABLE open_ai_key (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    api_key VARCHAR(255) NOT NULL,       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

-- Admin table for dashboard access
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
  `created_by` INT,
  `refresh_token` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create default super admin (password: Admin@123)
INSERT INTO `admins` (`username`, `email`, `password`, `role`) 
VALUES ('Super Admin', 'admin@example.com', '   $2b$10$VCrs8Y5yWc16SKJkU2xwo.TiyUC7WPle98IKr5KaK1FRtLqF2mE9', 'superadmin');

-- New tables for agent chat system
CREATE TABLE IF NOT EXISTS `agents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `agent_name` VARCHAR(255) NOT NULL,
  `status` ENUM('online', 'offline', 'busy') NOT NULL DEFAULT 'offline',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chat_rooms` (
  `id` VARCHAR(36) NOT NULL,
  `user_socket_id` VARCHAR(255),
  `user_name` VARCHAR(255) NOT NULL,
  `assigned_agent_id` INT,
  `status` ENUM('waiting', 'active', 'closed') NOT NULL DEFAULT 'waiting',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assigned_agent_id`) REFERENCES `agents`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_id` VARCHAR(36) NOT NULL,
  `sender_id` VARCHAR(255) NOT NULL,
  `sender_name` VARCHAR(255),
  `content` TEXT NOT NULL,
  `role` ENUM('user', 'agent', 'assistant', 'system') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`room_id`) REFERENCES `chat_rooms`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index for faster queries
CREATE INDEX `idx_room_id` ON `chat_messages` (`room_id`);
CREATE INDEX `idx_room_status` ON `chat_rooms` (`status`);
CREATE INDEX `idx_agent_status` ON `agents` (`status`);
CREATE INDEX `idx_admin_role` ON `admins` (`role`);
CREATE INDEX `idx_admin_email` ON `admins` (`email`);

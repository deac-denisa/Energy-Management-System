-- Insert an admin user with a generated UUID
INSERT INTO admin (id, username, password) VALUES (gen_random_uuid(), 'sonia_m', '123');

-- Insert a client user with a generated UUID
INSERT INTO client (id, username, password) VALUES (gen_random_uuid(), 'marian', 'mmm');

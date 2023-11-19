package com.sd.usermicroservice.repositories;

import com.sd.usermicroservice.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
    Admin findAdminByUsername(String username);
}

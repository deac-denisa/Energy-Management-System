package com.sd.usermicroservice.repositories;

import com.sd.usermicroservice.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

    Client findClientByUsername(String Username);

}

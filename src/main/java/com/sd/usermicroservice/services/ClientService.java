package com.sd.usermicroservice.services;

import com.sd.usermicroservice.entities.Client;
import com.sd.usermicroservice.repositories.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class ClientService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClientService.class);
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    //CRUD operations on users
    public List<Client> findAll() {
        List<Client> clientsList = clientRepository.findAll();
        return clientsList;
    }

    public UUID validateLogin (String username, String password){

        Client client= clientRepository.findClientByUsername(username);
        if(password.equals(client.getPassword())){
            return client.getId();
        }
        else return null;
    }

    public Client findById(UUID id){
        Optional<Client> optionalClient = clientRepository.findById(id);
        return optionalClient.orElse(null);
    }

    public UUID create(Client client) {
        client = clientRepository.save(client);
        LOGGER.debug("Person with id {} was inserted in db", client.getId());

        return client.getId();
    }

    public ResponseEntity<String> update(Client client) {
        Client oldClient = clientRepository.findById(client.getId()).orElse(null);
        if (oldClient == null) {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        } else {
            // Update the client fields with the new values
            oldClient.setUsername(client.getUsername());
            oldClient.setPassword(client.getPassword());
            clientRepository.save(oldClient);
            return new ResponseEntity<>(ResponseMessage.CLIENT_UPDATED.getMessage(), HttpStatus.OK);
        }
    }

    public ResponseEntity<String> delete(UUID id){
        Optional<Client> optionalClient = clientRepository.findById(id);
        if(optionalClient.isPresent()){
            Client client = optionalClient.get();
            clientRepository.delete(client);
            return new ResponseEntity<>(ResponseMessage.CLIENT_DELETED.getMessage(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}

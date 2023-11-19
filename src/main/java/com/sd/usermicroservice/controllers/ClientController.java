package com.sd.usermicroservice.controllers;

import com.sd.usermicroservice.entities.Client;
import com.sd.usermicroservice.services.AdminService;
import com.sd.usermicroservice.services.ClientService;
import com.sd.usermicroservice.services.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/client")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping()
    public ResponseEntity<List<Client>> getClients() {
        List<Client> clients = clientService.findAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<String> getClient(@PathVariable("id") UUID clientId) {
        Client client = clientService.findById(clientId);
        if(client != null) {
            return new ResponseEntity<>(client.toString(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/login")
    public ResponseEntity<UUID> verifyClient(@RequestParam String username, @RequestParam String password) {
        UUID id = clientService.validateLogin(username, password);
        if (id != null) {
            return new ResponseEntity<>(id, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping()
    public ResponseEntity<String> createClient(@Valid @RequestBody Client client) {
        UUID clientID = clientService.create(client);
        return new ResponseEntity<>(ResponseMessage.CLIENT_CREATED.getMessage()+clientID, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable("id") UUID clientId) {
        return clientService.delete(clientId);
    }

    @PutMapping()
    public ResponseEntity<String> updateClient(@Valid @RequestBody Client client){
        return clientService.update( client);
    }

}

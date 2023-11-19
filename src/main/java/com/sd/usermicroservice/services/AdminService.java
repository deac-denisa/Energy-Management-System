package com.sd.usermicroservice.services;

import com.sd.usermicroservice.entities.Admin;
import com.sd.usermicroservice.entities.Client;
import com.sd.usermicroservice.repositories.AdminRepository;
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
public class AdminService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);
    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    //CRUD operations on users
    public List<Admin> findAll() {
        List<Admin> adminsList = adminRepository.findAll();
        return adminsList;
    }

    public Admin findById(UUID id){
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        return optionalAdmin.orElse(null);
    }

    public UUID validateLogin (String username, String password){

        Admin admin = adminRepository.findAdminByUsername(username);
        if(password.equals(admin.getPassword())){
            return admin.getId();
        }
        else return null;
    }

    public UUID create(Admin admin) {
        admin = adminRepository.save(admin);
        LOGGER.debug("Person with id {} was inserted in db", admin.getId());

        return admin.getId();
    }

    public ResponseEntity<String> update(Admin admin) {
        Admin oldAdmin = adminRepository.findById(admin.getId()).orElse(null);
        if (oldAdmin == null) {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        } else {
            // Update the admin fields with the new values
            oldAdmin.setUsername(admin.getUsername());
            oldAdmin.setPassword(admin.getPassword());
            adminRepository.save(oldAdmin);
            return new ResponseEntity<>(ResponseMessage.CLIENT_UPDATED.getMessage(), HttpStatus.OK);
        }
    }

    public ResponseEntity<String> delete(UUID id){
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if(optionalAdmin.isPresent()){
            Admin admin = optionalAdmin.get();
            adminRepository.delete(admin);
            return new ResponseEntity<>(ResponseMessage.CLIENT_DELETED.getMessage(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}

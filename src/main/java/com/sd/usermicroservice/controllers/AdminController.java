package com.sd.usermicroservice.controllers;

import com.sd.usermicroservice.entities.Admin;
import com.sd.usermicroservice.services.AdminService;
import com.sd.usermicroservice.services.AdminService;
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
@RequestMapping(value = "/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping()
    public ResponseEntity<List<Admin>> getAdmins() {
        List<Admin> admins = adminService.findAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<String> getAdmin(@PathVariable("id") UUID adminId) {
        Admin admin = adminService.findById(adminId);
        if(admin != null) {
            return new ResponseEntity<>(admin.toString(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/login")
    public ResponseEntity<UUID> verifyAdmin(@RequestParam String username, @RequestParam String password) {
        UUID id = adminService.validateLogin(username, password);
        if (id != null) {
            return new ResponseEntity<>(id, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping()
    public ResponseEntity<String> createAdmin(@Valid @RequestBody Admin admin) {
        UUID adminID = adminService.create(admin);
        return new ResponseEntity<>(ResponseMessage.CLIENT_CREATED.getMessage()+adminID, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable("id") UUID adminId) {
        return adminService.delete(adminId);
    }

    @PutMapping()
    public ResponseEntity<String> updateAdmin(@Valid @RequestBody Admin admin){
        return adminService.update( admin);
    }

}

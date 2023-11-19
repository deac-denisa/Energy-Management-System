package com.sd.devicemicroservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
public class MetricDevice {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;
    @Column(name = "description", nullable = false)
    String description;
    @Column(name = "address", nullable = false)
    String address;
    @Column(name = "consumption", nullable = false)
    int consumption;
    @Column(name = "clientid", nullable = false)
    UUID clientId;

    public MetricDevice() {
    }

    public MetricDevice(UUID id, String description, String address, int consumption, UUID clientId) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.consumption = consumption;
        this.clientId = clientId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getConsumption() {
        return consumption;
    }

    public void setConsumption(int consumption) {
        this.consumption = consumption;
    }

    public UUID getClientId() {
        return clientId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }
}

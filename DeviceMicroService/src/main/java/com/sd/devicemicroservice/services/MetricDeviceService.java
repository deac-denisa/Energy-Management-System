package com.sd.devicemicroservice.services;

import com.sd.devicemicroservice.entities.MetricDevice;
import com.sd.devicemicroservice.repositories.MetricDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MetricDeviceService {

    private final MetricDeviceRepository metricDeviceRepository;

    @Autowired
    public MetricDeviceService(MetricDeviceRepository metricDeviceRepository) {
        this.metricDeviceRepository = metricDeviceRepository;
    }

    //CRUD operations on users
    public List<MetricDevice> findAll() {
        List<MetricDevice> metricDevicesList = metricDeviceRepository.findAll();
        return metricDevicesList;
    }

    public List<MetricDevice> findAllForClient(UUID clientID) {
        List<MetricDevice> metricDevicesList = metricDeviceRepository.findMetricDevicesByClientId(clientID);
        return metricDevicesList;
    }
    public MetricDevice findById(UUID id){
        Optional<MetricDevice> optionalMetricDevice = metricDeviceRepository.findById(id);
        return optionalMetricDevice.orElse(null);
    }

    public UUID create(MetricDevice metricDevice) {
        metricDevice = metricDeviceRepository.save(metricDevice);

        return metricDevice.getId();
    }

    public ResponseEntity<String> update(MetricDevice metricDevice) {
        MetricDevice oldMetricDevice = metricDeviceRepository.findById(metricDevice.getId()).orElse(null);
        if (oldMetricDevice == null) {
            return new ResponseEntity<>(ResponseMessage.DEVICE_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        } else {
            // Update the metricDevice fields with the new values
            oldMetricDevice.setDescription(metricDevice.getDescription());
            oldMetricDevice.setAddress(metricDevice.getAddress());
            oldMetricDevice.setConsumption(metricDevice.getConsumption());
            metricDeviceRepository.save(oldMetricDevice);
            return new ResponseEntity<>(ResponseMessage.DEVICE_UPDATED.getMessage(), HttpStatus.OK);
        }
    }

    public ResponseEntity<String> delete(UUID id){
        Optional<MetricDevice> optionalMetricDevice = metricDeviceRepository.findById(id);
        if(optionalMetricDevice.isPresent()){
            MetricDevice metricDevice = optionalMetricDevice.get();
            metricDeviceRepository.delete(metricDevice);
            return new ResponseEntity<>(ResponseMessage.DEVICE_DELETED.getMessage(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.DEVICE_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

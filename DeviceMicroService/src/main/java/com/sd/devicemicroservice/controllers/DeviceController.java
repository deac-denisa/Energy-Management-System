package com.sd.devicemicroservice.controllers;

import com.sd.devicemicroservice.entities.MetricDevice;
import com.sd.devicemicroservice.services.MetricDeviceService;
import com.sd.devicemicroservice.services.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/device")
public class DeviceController {

    private final MetricDeviceService metricDeviceService;

    @Autowired
    public DeviceController(MetricDeviceService metricDeviceService) {
        this.metricDeviceService = metricDeviceService;
    }

    @GetMapping()
    public ResponseEntity<List<MetricDevice>> getMetricDevices() {
        List<MetricDevice> metricDevices = metricDeviceService.findAll();
        return new ResponseEntity<>(metricDevices, HttpStatus.OK);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<List<MetricDevice>> getClientDevices(@PathVariable("id") UUID clientId) {
        List<MetricDevice> metricDevices = metricDeviceService.findAllForClient(clientId);
        return new ResponseEntity<>(metricDevices, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<String> getMetricDevice(@PathVariable("id") UUID metricDeviceId) {
        MetricDevice metricDevice = metricDeviceService.findById(metricDeviceId);
        if(metricDevice != null) {
            return new ResponseEntity<>(metricDevice.toString(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(ResponseMessage.DEVICE_NOT_FOUND.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<String> createMetricDevice(@Valid @RequestBody MetricDevice metricDevice) {
        UUID metricDeviceID = metricDeviceService.create(metricDevice);
        return new ResponseEntity<>(ResponseMessage.DEVICE_CREATED.getMessage()+metricDeviceID, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteMetricDevice(@PathVariable("id") UUID metricDeviceId) {
        return metricDeviceService.delete(metricDeviceId);
    }

    @PutMapping()
    public ResponseEntity<String> updateMetricDevice(@Valid @RequestBody MetricDevice metricDevice){
        return metricDeviceService.update( metricDevice);
    }
}

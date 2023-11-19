package com.sd.devicemicroservice.repositories;

import com.sd.devicemicroservice.entities.MetricDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MetricDeviceRepository extends JpaRepository<MetricDevice, UUID> {

    List<MetricDevice> findMetricDevicesByClientId(UUID clientID);
}

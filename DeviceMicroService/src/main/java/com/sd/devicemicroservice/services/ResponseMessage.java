package com.sd.devicemicroservice.services;

public enum ResponseMessage {
    DEVICE_CREATED("Client created successfully with id = "),
    DEVICE_NOT_FOUND("Client not found."),
    DEVICE_UPDATED("Client updated successfully"),
    DEVICE_DELETED("Client deleted successfully.")
    ;

    private final String message;

    ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

package com.sd.usermicroservice.services;

public enum ResponseMessage {
    CLIENT_CREATED("Client created successfully with id = "),
    CLIENT_NOT_FOUND("Client not found."),
    CLIENT_UPDATED("Client updated successfully"),
    CLIENT_DELETED("Client deleted successfully.")
    ;

    private final String message;

    ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

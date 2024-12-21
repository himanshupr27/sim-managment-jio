package com.simmanagmentplatform.Dto;


import java.util.Set;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonProperty;
// import com.simmanagmentplatform.Entity.OrdersEntity;
// import com.simmanagmentplatform.Entity.SimDetailsEntity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersDTO {
    private Long id;

    @NotEmpty(message = "Full name cannot be empty")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @Email(message = "Email must be valid")
    private String emailId;

    private Set<String> roles;

    private Set<OrdersDTO> orders;

    private Set<SimDetailsDTO> sims;

    // @JsonIgnore
    // public String getEncryptedPin() {
    //     return this.encryptedPin;
    // }

    // @JsonProperty
    // public String setEncryptedPin(String encryptedPin) {
    //     return this.encryptedPin = encryptedPin;
    // }
}

package com.simmanagmentplatform.simmanagment.Dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.util.Set;

import com.simmanagmentplatform.simmanagment.Entity.OrdersEntity;
import com.simmanagmentplatform.simmanagment.Entity.SimDetailsEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
     
    private Long id;

    @NotEmpty(message = "Full name cannot be empty")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @NotEmpty(message = "Date of Birth cannot be empty")
    private String dob;

    @NotEmpty(message = "Gender cannot be empty")
    private String gender;

    @NotEmpty
    @Size(min = 10, max = 10, message = "Enter a valid Phone Number")
    private String phoneNumber;

    @Email(message = "Email must be valid")
    private String emailId;

    @NotEmpty(message = "PAN number cannot be empty")
    // @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN format")
    private String pan;

    @NotEmpty(message = "Aadhar number cannot be empty")
    // @Pattern(regexp = "^[2-9]{1}[0-9]{11}$", message = "Invalid Aadhar format")
    private String aadhar;

    @NotEmpty
    @Size(min = 6, max = 6, message = "PIN must be 6 digits")
    @Pattern(regexp = "^[0-9]{6}$", message = "Encrypted PIN must contain only numbers")
    private String encryptedPin;

    private AddressDTO address;

    private Set<SimDetailsEntity> sims;
    private Set<OrdersEntity> orders;
}

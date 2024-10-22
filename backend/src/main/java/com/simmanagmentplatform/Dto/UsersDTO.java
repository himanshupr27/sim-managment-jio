package com.simmanagmentplatform.Dto;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersDTO {
    private Long id;

    @NotEmpty
    @Size(min=3,max=50,message = "Username must be of minimum 3 chracters and maximum 50 chracters")
    private String usersName;

    @NotEmpty
    @Size(min=10, max=10,message = "Enter a valid Phone Number")
    private String phoneNumber;

    @Email(message = "Email must be valid")
    private String emailId;

    @NotEmpty
    @Size(min=8, max=20, message="Password length must be between 8-15")
    @Pattern(regexp="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$",
    message="Password must contain at least one digit, one lowercase, one uppercase, and one special character and must be of length 8-20")
    private String password;

    @JsonIgnore
    public String getPassword()
    {
       return this.password;
    }

    @JsonProperty
    public String setPassword(String password)
    {
        return this.password=password;
    }
    
    private Set<String> roles;

}

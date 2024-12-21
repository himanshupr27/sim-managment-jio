package com.simmanagmentplatform.simmanagment.Entity;

import lombok.*;
import jakarta.persistence.Embeddable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Address {
    private String street;
    private String city;
    private String state;
    private String country;
    private String pin;
}

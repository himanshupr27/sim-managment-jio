package com.simmanagmentplatform.simmanagment.Entity;


// import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Temporal(TemporalType.DATE)
    private String dob;

    private String gender;

    private String phoneNumber;

    private String emailId;

    private String pan;

    private String aadhar;

    private String encryptedPin;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    Set<Roles> roles;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL,orphanRemoval = true)
    // @ToString.Exclude
    private Set<SimDetailsEntity> sims;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    // @ToString.Exclude
    private Set<OrdersEntity> orders;

}

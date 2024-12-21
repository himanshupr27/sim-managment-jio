package com.simmanagmentplatform.Entity;

// import jakarta.persistence.Column;

// import java.util.Collection;
// import java.util.HashSet;
import java.util.Set;
// import java.util.stream.Collectors;

// import com.fasterxml.jackson.annotation.JsonManagedReference;

// import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UsersEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String emailId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Roles> roles;


    @OneToMany(mappedBy = "usersEntity", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<OrdersEntity> orders;


    @OneToMany(mappedBy = "usersEntity", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @ToString.Exclude
    private Set<SimDetailsEntity> sims;

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     return this.roles.stream()
    //         .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
    //         .collect(Collectors.toSet());
    // }

    // @Override
    // public String getUsername() {
    //     return this.emailId;
    // }

    // @Override
    // public boolean isAccountNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isAccountNonLocked() {
    //     return true;
    // }

    // @Override
    // public boolean isCredentialsNonExpired() {
    //     return true;
    // }

    // @Override
    // public boolean isEnabled() {
    //     return true;
    // }
}

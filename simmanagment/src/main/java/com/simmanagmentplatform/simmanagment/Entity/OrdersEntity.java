package com.simmanagmentplatform.simmanagment.Entity;


import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="orders")
public class OrdersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deliveryAddress;

    @Column(name = "status")
    private String orderStatus;

    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Temporal(TemporalType.DATE)
    private Date deliveryDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    
}

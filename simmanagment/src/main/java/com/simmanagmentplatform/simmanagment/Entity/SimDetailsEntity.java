package com.simmanagmentplatform.simmanagment.Entity;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="sims")
public class SimDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sim_id;

    // @Column(nullable = false, length = 10)
    private String simNumber;

    // @Column(nullable = false, unique = true, length = 20)
    private String CIID;

    // @Column(nullable = false, unique = true, length = 20)
    private String IMSI;

    private String status;

    private Date addDate;

    private Boolean available;

    private Date issueDate;

    @OneToOne
    @JoinColumn(name = "service_id")
    private ServicePlanEntity servicePlanEntity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}

package com.simmanagmentplatform.simmanagment.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services_plan")
public class ServicePlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long service_id;

    @Column(nullable = false)
    private String calls;
    
    @Column(nullable = false)
    private String sms;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String price;

    
}

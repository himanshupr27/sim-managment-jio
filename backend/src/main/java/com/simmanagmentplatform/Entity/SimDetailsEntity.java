package com.simmanagmentplatform.Entity;



import java.util.Date;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sims")
public class SimDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sim_id;

    @Column(nullable = false , length = 10)
    private String simNumber; 

    @Column(nullable = false, unique = true,  length = 20)
    private String CIID;

    @Column(nullable = false, unique = true, length = 20)
    private String IMSI;

    private String profileName;
    
    private String status; 
    
    private Date addDate;
    
    private Boolean available;
    
    private Date issueDate;
    
    @OneToOne
    @JoinColumn(name ="service_plan_id")
    private ServicePlanEntity servicePlanEntity;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UsersEntity usereEntity = null; 

}


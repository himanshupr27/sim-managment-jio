package com.simmanagmentplatform.Entity;


import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="ekyc_details")
public class EkycEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pan;

    private String aadhar;

    @Column(name="status")
    private String kycstatus;

    @Lob
    private byte[] panpic;

    @Lob
    private byte[] profilepic;

    @Column(name = "addresspic")
    @Lob
    private byte[] addressproofpic;
    
    @Lob
    private byte[] video;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private ProfileEntity profileEntity;
    
}

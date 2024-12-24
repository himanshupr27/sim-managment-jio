package com.simmanagmentplatform.Reposiotry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.EkycEntity;

public interface eKycRepo extends JpaRepository<EkycEntity,Long> {

  List<EkycEntity> findByKycstatus(String kycstatus);
  
}

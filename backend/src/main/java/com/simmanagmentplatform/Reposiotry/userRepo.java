package com.simmanagmentplatform.Reposiotry;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.Entity.UsersEntity;


public interface userRepo extends JpaRepository<UsersEntity,Long>{

 Optional<UsersEntity> findOneByEmailIdAndPassword(String emailId, String psassword);

 Optional<UsersEntity> findByEmailId(String emailId);

}

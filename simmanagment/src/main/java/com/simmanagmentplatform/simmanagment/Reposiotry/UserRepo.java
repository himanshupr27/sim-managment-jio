package com.simmanagmentplatform.simmanagment.Reposiotry;

// import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simmanagmentplatform.simmanagment.Entity.UserEntity;


public interface UserRepo extends JpaRepository<UserEntity,Long>{
}

package com.simmanagmentplatform.simmanagment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SimmanagmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimmanagmentApplication.class, args);
	}

}

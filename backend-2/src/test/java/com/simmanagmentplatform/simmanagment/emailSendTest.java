package com.simmanagmentplatform.simmanagment;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

// import com.simmanagmentplatform.Services.EmialServices;

@SpringBootTest
public class emailSendTest {
    @Autowired
    // private EmialServices emialServices;
    @Test
    void emailSendTests(){
        System.out.println("sending emial");
        //  emialServices.sendEmail("hipr27052002@gmail.com");

    }
}

package com.simmanagmentplatform.Controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.*;




@RestController
// @CrossOrigin("http://localhost:5173")
// @CrossOrigin(origins = "*")
@RequestMapping("/api/order")
public class orderController {
    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String, Object> data) throws Exception {
        int amount = (int) data.get("amount");
        // System.out.println("Amount: " + amount);
        // System.out.println("payment initiated");


        var client = new RazorpayClient("rzp_test_VtabkGRGa9SEhd", "675RezP9uZy5Acc8BP2TPNeE");
        JSONObject ob = new JSONObject();
        ob.put("amount",amount*100);
        ob.put("currency","INR");
        ob.put("receipt","txn_235425");
        Order order = client.orders.create(ob);
        // System.out.println(order);
        return order.toString();
    }
}

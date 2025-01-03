package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.util.Map;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String url) {
        System.out.println("searching for URL: " + url);

        int responseCode = 0;
        String status = "offline";
        String ipAddress = "N/A";
        long responseTime = 0;
        String serverInfo = "N/A";

        try {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }

            URL website = new URL(url);
            InetAddress inetAddress = InetAddress.getByName(website.getHost());
            ipAddress = inetAddress.getHostAddress();

            HttpURLConnection connection = (HttpURLConnection) website.openConnection();
            connection.setRequestMethod("GET");

            long startTime = System.currentTimeMillis();
            connection.connect();
            long endTime = System.currentTimeMillis();

            responseTime = endTime - startTime;

            responseCode = connection.getResponseCode();
            serverInfo = connection.getHeaderField("Server");

            if (responseCode == HttpURLConnection.HTTP_OK) {
                status = "online";
            } else {
                status = "offline";
            }

        } catch (IOException e) {
            System.err.println("Error while checking URL: " + e.getMessage());
            status = "error";
        }

        return ResponseEntity.ok().body(Map.of(
                "status", status,
                "url", url,
                "responseCode", responseCode,
                "ipAddress", ipAddress,
                "responseTime", responseTime,
                "serverInfo", serverInfo
        ));
    }
}

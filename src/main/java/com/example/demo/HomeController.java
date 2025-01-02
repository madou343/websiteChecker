package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.HttpURLConnection;
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
        String status = "offline"; // Standardstatus, falls die Verbindung fehlschlägt

        try {

            URL website = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) website.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            responseCode = connection.getResponseCode();


            if (responseCode == HttpURLConnection.HTTP_OK) { // 200 ist der HTTP_OK-Code
                status = "online";
            } else {
                status = "offline";
            }

        } catch (IOException e) {
            System.err.println("Error while checking URL: " + e.getMessage());
            status = "error";
        }

        // Gebe die Antwort als JSON zurück
        return ResponseEntity.ok().body(Map.of(
                "status", status,
                "url", url,
                "responseCode", responseCode
        ));
    }
}

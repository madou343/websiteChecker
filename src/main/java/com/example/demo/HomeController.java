package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index"; // Gibt die index.html-Datei im 'templates'-Verzeichnis zurück
    }






    @GetMapping("/search")
    public String search(@RequestParam String url) {
        // Loggt die URL in der Konsole des Servers
        System.out.println("searching for URL: " + url);

        // Gibt eine einfache JSON-Antwort zurück
        return "{\"status\": \"searching\", \"url\": \"" + url + "\"}";
    }
}

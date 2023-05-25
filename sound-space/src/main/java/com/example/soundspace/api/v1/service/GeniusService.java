package com.example.soundspace.api.v1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class GeniusService {

    @Autowired
    private WebClient geniusWebClient;

    public Mono<Song> getSong(String songId) {
        return geniusWebClient.get()
                .uri("/songs/{id}", songId)
                .retrieve()
                .bodyToMono(Song.class);
    }
}

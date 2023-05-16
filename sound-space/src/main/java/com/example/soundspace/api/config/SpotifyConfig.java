package com.example.soundspace.api.config;

import com.example.soundspace.api.spotify.SpotifyToken;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class SpotifyConfig {
    @Value("${spotify.clientId}")
    private String clientId;

    @Value("${spotify.clientSecret}")
    private String clientSecret;

    private SpotifyApi spotifyApi;
    private ClientCredentialsRequest clientCredentialsRequest;

    @PostConstruct
    public void init() {
        SpotifyToken.setClientId(clientId);
        SpotifyToken.setClientSecret(clientSecret);

        spotifyApi = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();

        clientCredentialsRequest = spotifyApi.clientCredentials()
                .build();

        SpotifyToken.setSpotifyApi(spotifyApi);
        SpotifyToken.setClientCredentialsRequest(clientCredentialsRequest);
    }
}

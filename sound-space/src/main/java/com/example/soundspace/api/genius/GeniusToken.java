package com.example.soundspace.api.genius;

import com.github.scribejava.apis.GeniusApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Component
public class GeniusToken {

    private final String clientId;

    private final String clientSecret;

    public GeniusToken(@Value("${genius.client-id}") String clientId,
                       @Value("${genius.client-secret}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public String getAccessToken() {
        OAuth20Service service = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .build(GeniusApi.instance());

        try {
            OAuth2AccessToken accessToken = service.getAccessTokenClientCredentialsGrant();
            return accessToken.getAccessToken();
        } catch (IOException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null;
        }
    }
}

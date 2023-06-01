package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

public class PlaylistRequestDto {

    @Getter
    @Setter
    public static class Update {
        private String trackTitle;
        private String artistName;
        private String albumImageUrl;
        private String lyrics;
    }
}

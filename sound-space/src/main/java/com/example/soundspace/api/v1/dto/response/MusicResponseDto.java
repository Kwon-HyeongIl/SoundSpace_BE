package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


public class MusicResponseDto {

//    @Builder
//    @Getter
//    @AllArgsConstructor
//    public static class TrackInfo {
//        private String artistName;
//        private String trackTitle;
//        private String albumImageUrl;
//    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TrackInfo {
        private Long id;
        private String trackTitle;
        private String artistName;
        private String albumImageUrl;
        private String lyrics;
    }
}

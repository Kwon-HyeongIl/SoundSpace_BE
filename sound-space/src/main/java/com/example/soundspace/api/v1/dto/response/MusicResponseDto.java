package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


public class MusicResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class SearchInfo {
        private Long musicId;
        private String artistName;
        private String trackTitle;
        private String albumImageUrl;
        private boolean isBookmarked;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class MusicInfo {
        private Long musicId;
        private String trackTitle;
        private String artistName;
        private String albumImageUrl;
        private String lyrics;
    }
}

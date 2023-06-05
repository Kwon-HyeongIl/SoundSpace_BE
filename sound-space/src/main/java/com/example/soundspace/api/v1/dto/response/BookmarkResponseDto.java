package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class BookmarkResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class BookmarkInfo {
        private Long musicId;
        private String albumImageUrl;
        private String trackTitle;
        private String artistName;
    }
}

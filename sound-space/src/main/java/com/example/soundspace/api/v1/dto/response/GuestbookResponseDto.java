package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class GuestbookResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class GuestbookInfo {
        private String writerName;
        private String content;
    }
}

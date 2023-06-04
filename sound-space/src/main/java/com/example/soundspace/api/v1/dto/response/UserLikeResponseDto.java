package com.example.soundspace.api.v1.dto.response;

import lombok.*;

public class UserLikeResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserLikeInfo {
        private Long id;
        private Long userId;
        private String username;
    }
}



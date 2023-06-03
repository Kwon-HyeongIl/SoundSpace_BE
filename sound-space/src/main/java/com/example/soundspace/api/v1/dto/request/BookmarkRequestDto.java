package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

public class BookmarkRequestDto {

    @Getter
    @Setter
    public static class BookmarkInfo {

        @NotEmpty(message = "곡 제목은 필수 입력값입니다.")
        private String trackTitle;

        @NotEmpty(message = "가수 이름은 필수 입력값입니다.")
        private String artistName;
    }
}

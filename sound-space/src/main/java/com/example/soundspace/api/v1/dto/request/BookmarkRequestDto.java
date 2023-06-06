package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

public class BookmarkRequestDto {

    @Getter
    @Setter
    public static class toggleBookmarkAtMusic {

        @NotEmpty(message = "앨범 이미지 Url은 필수 입력값입니다.")
        private String albumImageUrl;

        @NotEmpty(message = "곡 제목은 필수 입력값입니다.")
        private String trackTitle;

        @NotEmpty(message = "가수 이름은 필수 입력값입니다.")
        private String artistName;
    }
}

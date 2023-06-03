package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class GuestBookRequestDto {

    @NotEmpty(message = "빈칸으로 제출할 수 없습니다.")
    private String content;

}
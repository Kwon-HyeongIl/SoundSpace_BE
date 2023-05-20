package com.example.soundspace.api.v1.dto.response;

import com.example.soundspace.api.entity.UserLikes;
import com.example.soundspace.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLikesResponseDto {
    private String username;
    private String profilePictureUrl;
    private Integer totalLikes;

    public static UserLikesResponseDto fromEntity(Users user) {
        UserLikesResponseDto dto = new UserLikesResponseDto();
        dto.setUsername(user.getUsername());
        dto.setProfilePictureUrl(user.getProfilePictureUrl());
        dto.setTotalLikes(user.getLikesReceived().size());
        return dto;
    }
}


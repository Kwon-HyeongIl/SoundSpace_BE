package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.UserLikes;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.v1.dto.response.UserLikesResponseDto;
import com.example.soundspace.api.v1.repository.UserLikesRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserLikesService {

    private final UsersRepository usersRepository;
    private final UserLikesRepository userLikesRepository;

    @Transactional
    public UserLikesResponseDto likeUser(Users liker, Long likeeId) {
        Users likee = usersRepository.findById(likeeId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + likeeId));

        Optional<UserLikes> optionalUserLike = userLikesRepository.findByLikerAndLikee(liker, likee);
        UserLikes userLike;

        if (optionalUserLike.isPresent()) {
            // User has already liked this other user, so unlike.
            userLike = optionalUserLike.get();
            liker.getLikesGiven().remove(userLike);
            likee.getLikesReceived().remove(userLike);
            userLikesRepository.delete(userLike);
            userLike = null;  // Because the like has been removed, set userLike to null
        } else {
            // User has not yet liked this other user, so like.
            userLike = UserLikes.builder().liker(liker).likee(likee).build();
            liker.getLikesGiven().add(userLike);
            likee.getLikesReceived().add(userLike);
            userLikesRepository.save(userLike);
        }

        usersRepository.save(liker);
        usersRepository.save(likee);

        // Now create a DTO from the user that received the like/unlike
        return UserLikesResponseDto.fromEntity(likee);
    }


    public List<UserLikesResponseDto> getUsersILiked(Users liker) {
        return liker.getLikesGiven().stream()
                .map(userLike -> UserLikesResponseDto.fromEntity(userLike.getLikee()))
                .collect(Collectors.toList());
    }

    public List<UserLikesResponseDto> getUsersWhoLikedMe(Users likee) {
        return likee.getLikesReceived().stream()
                .map(userLike -> UserLikesResponseDto.fromEntity(userLike.getLiker()))
                .collect(Collectors.toList());
    }
}

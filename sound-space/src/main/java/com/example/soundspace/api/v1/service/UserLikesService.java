package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.UserLikes;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.jwt.JwtTokenProvider;
import com.example.soundspace.api.v1.dto.response.UserLikesResponseDto;
import com.example.soundspace.api.v1.repository.UserLikesRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserLikesService {

    private final UsersRepository usersRepository;
    private final UserLikesRepository userLikesRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private String removeBearerFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring("Bearer ".length());
        }
        return token;
    }

    public String getAuthenticatedUsername(String token) {
        token = removeBearerFromToken(token);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("Invalid token");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        if(authentication == null) {
            throw new IllegalArgumentException("Authentication failed. User is not authenticated.");
        }
        return authentication.getName();
    }

    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
    }
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

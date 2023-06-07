package com.example.soundspace.api.v1.service;

import com.example.soundspace.api.entity.UserLikes;
import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.security.SecurityUtil;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.response.UserLikeResponseDto;
import com.example.soundspace.api.v1.repository.UserLikesRepository;
import com.example.soundspace.api.v1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserLikesService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UsersRepository usersRepository;
    private final UserLikesRepository userLikesRepository;
    private final Response response;

    public ResponseEntity<?> toggleLikeByUserId(String userId) {
        String username = SecurityUtil.getCurrentUsername();
        Users liker = (Users) customUserDetailsService.loadUserByUsername(username);
        Users likee;

        if (userId.equals("me")) {
            likee = liker;
        } else if (usersRepository.existsById(Long.parseLong(userId))) {
            Optional<Users> optionalLikee = usersRepository.findById(Long.parseLong(userId));
            likee = optionalLikee.get();
        } else {
            return response.fail("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);
        }

        Optional<UserLikes> optionalUserLike = userLikesRepository.findByLikerAndLikee(liker, likee);
        if (optionalUserLike.isPresent()) {
            UserLikes userLike = optionalUserLike.get();
            userLikesRepository.delete(userLike);
            return response.success("좋아요 해제에 성공했습니다.");
        } else {
            UserLikes userLike = UserLikes.builder()
                    .liker(liker)
                    .likee(likee)
                    .build();
            userLikesRepository.save(userLike);
            return response.success("좋아요 설정에 성공했습니다.");
        }
    }

    public ResponseEntity<?> getAllMyLikesGiven() {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<UserLikes> userLikes = userLikesRepository.findAllByLiker(user);
        if (userLikes.isEmpty()) {
            return response.success("아직 내가 좋아요한 유저가 없습니다.");
        } else {
            List<UserLikeResponseDto.UserLikeInfo> userLikeInfos = new ArrayList<>();
            for (UserLikes userLike : userLikes) {
                UserLikeResponseDto.UserLikeInfo userLikeInfo = UserLikeResponseDto.UserLikeInfo.builder()
                        .id(userLike.getId())
                        .username(userLike.getLikee().getUsername())
                        .userId(userLike.getLikee().getId())
                        .build();

                userLikeInfos.add(userLikeInfo);
            }
            return response.success(userLikeInfos, "좋아요 목록 조회에 성공했습니다.", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllMyLikesReceived() {
        String username = SecurityUtil.getCurrentUsername();
        Users user = (Users) customUserDetailsService.loadUserByUsername(username);

        List<UserLikes> userLikes = userLikesRepository.findAllByLikee(user);
        if (userLikes.isEmpty()) {
            return response.success("아직 받은 좋아요가 없습니다.");
        } else {
            List<UserLikeResponseDto.UserLikeInfo> userLikeInfos = new ArrayList<>();
            for (UserLikes userLike : userLikes) {
                UserLikeResponseDto.UserLikeInfo userLikeInfo = UserLikeResponseDto.UserLikeInfo.builder()
                        .id(userLike.getId())
                        .username(userLike.getLiker().getUsername())
                        .userId(userLike.getLiker().getId())
                        .build();

                userLikeInfos.add(userLikeInfo);
            }
            return response.success(userLikeInfos, "좋아요 목록 조회에 성공했습니다.", HttpStatus.OK);
        }
    }
}

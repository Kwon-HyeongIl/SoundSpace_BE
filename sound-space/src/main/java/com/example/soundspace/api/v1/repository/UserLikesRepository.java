package com.example.soundspace.api.v1.repository;

import com.example.soundspace.api.entity.UserLikes;
import com.example.soundspace.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLikesRepository extends JpaRepository<UserLikes, Long> {
    Optional<UserLikes> findByLikerAndLikee(Users liker, Users likee);
    List<UserLikes> findAllByLiker(Users liker);
    List<UserLikes> findAllByLikee(Users likee);
}

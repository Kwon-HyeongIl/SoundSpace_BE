package com.example.soundspace;

import com.example.soundspace.api.entity.Users;
import com.example.soundspace.api.v1.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@SpringBootTest
class SoundSpaceApplicationTests {

	@Autowired
	UsersRepository usersRepository;
	@Test
	void contextLoads() {

	}

}

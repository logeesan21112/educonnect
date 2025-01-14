package com.educonnect.backend.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.educonnect.backend.dto.UserDto;
import com.educonnect.backend.modal.User;

public class UserDtoMapper {
	
	public static UserDto toUserDto(User user) {
		UserDto userDto=new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getImage());
		userDto.setFullName(user.getFullName());
		userDto.setImage(user.getImage());
		userDto.setBackgroundImage(user.getBackgroundImage());
		userDto.setBio(user.getBio());
		userDto.setBirthDate(user.getBirthdate());
		userDto.setFollowers(toUserDtos(user.getFollowers()));
		userDto.setFollowing(toUserDtos(user.getFollowing()));
		userDto.setLogin_with_google(user.isLogin_with_google());
		userDto.setLocation(user.getLocation());
		//	userDto.setVerified(false);
		
		return userDto;
	}

	public static List<UserDto> toUserDtos(List<User> followers) {
		
		List<UserDto> userDtos=new ArrayList<>();
		
		for(User user : followers) {
			
			UserDto userDto=new UserDto();
			userDto.setId(user.getId());
			userDto.setEmail(user.getImage());
			userDto.setFullName(user.getFullName());
			userDto.setImage(user.getImage());
			userDtos.add(userDto);
		}
		
		return userDtos;
	}
}

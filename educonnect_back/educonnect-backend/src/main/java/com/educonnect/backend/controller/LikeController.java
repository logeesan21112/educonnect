package com.educonnect.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educonnect.backend.dto.LikeDto;
import com.educonnect.backend.dto.mapper.LikeDtoMapper;
import com.educonnect.backend.exception.TwitException;
import com.educonnect.backend.exception.UserException;
import com.educonnect.backend.modal.Like;
import com.educonnect.backend.modal.User;
import com.educonnect.backend.service.LikeService;
import com.educonnect.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private LikeService likeService;
	
	/*
	@PostMapping("/{twitld}/likes")
	public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitld,
			@RequestHeader("Authorization") String jwt)throws UserException, TwitException{
	User user=userService.findUserProfileByJwt(jwt);
	Like like=likeService.likeTwit(twitld, user);
	LikeDto likeDto=LikeDtoMapper.toLikeDto(like, user);
	
	return new ResponseEntity<LikeDto>(likeDto,HttpStatus.CREATED);
	}
	*/
	
	@PostMapping("/{twitId}/likes")
	public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitId,
	        @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
	    User user = userService.findUserProfileByJwt(jwt);
	    Like like = likeService.likeTwit(twitId, user);
	    
	    if (like == null) {
	        return new ResponseEntity<>(HttpStatus.OK); // Indicate unliked
	    }
	    
	    LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);
	    return new ResponseEntity<>(likeDto, HttpStatus.CREATED); // Indicate liked
	}

	
	@PostMapping("/twit/{twitld}")
	public ResponseEntity<List<LikeDto>> gwtAllLikes(@PathVariable Long twitld,
			@RequestHeader("Authorization") String jwt)throws UserException, TwitException{
	
	User user=userService.findUserProfileByJwt(jwt);
	List<Like> likes=likeService.getAllLikes(twitld);
	List<LikeDto> likeDtos=LikeDtoMapper.toLikeDtos(likes, user);
	
	return new ResponseEntity<>(likeDtos,HttpStatus.CREATED);
	}
}

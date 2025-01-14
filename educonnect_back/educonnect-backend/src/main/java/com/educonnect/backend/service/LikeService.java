package com.educonnect.backend.service;

import java.util.List;

import com.educonnect.backend.exception.TwitException;
import com.educonnect.backend.exception.UserException;
import com.educonnect.backend.modal.Like;
import com.educonnect.backend.modal.User;

public interface LikeService {
	
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException;
	public List<Like> getAllLikes(Long twitId) throws TwitException;
}

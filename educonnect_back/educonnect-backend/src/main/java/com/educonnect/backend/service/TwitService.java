package com.educonnect.backend.service;

import java.util.List;

import com.educonnect.backend.exception.TwitException;
import com.educonnect.backend.exception.UserException;
import com.educonnect.backend.modal.Twit;
import com.educonnect.backend.modal.User;
import com.educonnect.backend.request.TwitReplayRequest;

public interface TwitService {
	
	public Twit createTwit(Twit req, User user)throws UserException;
	public List<Twit> findAllTwit();
	public Twit retwit(Long twitId, User user) throws UserException, TwitException;
	public Twit findById(Long twitId) throws TwitException;
	
	public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException;
	
	public Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException;
	
	public Twit createdReply(TwitReplayRequest req, User user)throws TwitException;

	public List<Twit> getUserTwit(User user);
	
	public List<Twit>findByLikesContainsUser(User user);
}

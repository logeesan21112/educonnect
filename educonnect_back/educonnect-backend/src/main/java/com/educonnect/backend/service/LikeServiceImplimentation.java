package com.educonnect.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.educonnect.backend.exception.TwitException;
import com.educonnect.backend.exception.UserException;
import com.educonnect.backend.modal.Like;
import com.educonnect.backend.modal.Twit;
import com.educonnect.backend.modal.User;
import com.educonnect.backend.repository.LikeRepository;
import com.educonnect.backend.repository.TwitRepository;

@Service
public class LikeServiceImplimentation implements LikeService{
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private TwitService twitService;
	
	@Autowired
	private TwitRepository twitRepository;
	
	/*
	@Override
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException {

		Like isLikeExist=likeRepository.isLikeExist(user.getId(), twitId);
		
		if(isLikeExist!=null) {
			likeRepository.deleteById(isLikeExist.getId());
			return isLikeExist;
		}
		
		Twit twit=twitService.findById(twitId);
		
		Like like=new Like();
		like.setTwit(twit);
		like.setUser(user);
		
		Like savedLike=likeRepository.save(like);
		
		twit.getLikes().add(savedLike);
		twitRepository.save(twit);
		
		return savedLike;
	}
	*/
	
	@Override
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException {
	    Like isLikeExist = likeRepository.isLikeExist(user.getId(), twitId);
	    
	    if (isLikeExist != null) {
	        likeRepository.deleteById(isLikeExist.getId());
	        // Consider returning an indication that the like was removed
	        return null; // or create a DTO to indicate 'unliked'
	    }
	    
	    Twit twit = twitService.findById(twitId);
	    
	    Like like = new Like();
	    like.setTwit(twit);
	    like.setUser(user);
	    
	    Like savedLike = likeRepository.save(like);
	    
	    twit.getLikes().add(savedLike);
	    twitRepository.save(twit);
	    
	    return savedLike;
	}


	@Override
	public List<Like> getAllLikes(Long twitId) throws TwitException {
		
		Twit twit=twitService.findById(twitId);
		List<Like> likes=likeRepository.findByTwitId(twitId);
		return likes;
	}
	
	

}

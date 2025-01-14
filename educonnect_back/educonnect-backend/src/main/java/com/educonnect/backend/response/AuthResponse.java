package com.educonnect.backend.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {

    private String jwt;
    private boolean status;

    public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	// Manually created no-argument constructor
    public AuthResponse() {
    }
    
	// Manually created constructor
    public AuthResponse(String jwt, boolean status) {
        this.jwt = jwt;
        this.status = status;
    }
}

package org.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.backend.model.User;
import org.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Autowired
    private UserRepository userRepository;

    public String generateToken(Authentication authentication) {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");
        String firstName = user.getAttribute("given_name");
        String lastName = user.getAttribute("family_name");
        String sub = user.getAttribute("sub");
        String picture = user.getAttribute("picture");

        userRepository.findByGoogleId(sub)
                .orElseGet(() -> userRepository.save(new User(sub, email, firstName, lastName, picture)));

        return Jwts.builder()
                .setSubject(email)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("sub", sub)
                .claim("picture", picture)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                .signWith(key)
                .compact();
    }
}

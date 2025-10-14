package org.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.backend.model.User;
import org.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    private UserRepository userRepository;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

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
                .setSubject(sub)
                .claim("sub", sub)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("email", email)
                .claim("picture", picture)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                .signWith(getSigningKey())
                .compact();
    }

    // Verify JWT token
    public ResponseEntity<?> verifyToken(String authHeader) {
        try {
            // Extract token from "Bearer <token>"
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(Map.of("valid", false, "error", "Missing or invalid Authorization header"));
            }

            String token = authHeader.substring(7);

            // Parse and verify the JWT token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Token is valid → return claims if you want
            return ResponseEntity.ok().body(Map.of(
                    "valid", true,
                    "sub", claims.getSubject(),
                    "email", claims.get("email"),
                    "firstName", claims.get("firstName"),
                    "lastName", claims.get("lastName"),
                    "expiresAt", claims.getExpiration()
            ));

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(401).body(Map.of("valid", false, "error", "Token expired"));
        } catch (JwtException e) {
            return ResponseEntity.status(401).body(Map.of("valid", false, "error", "Invalid token"));
        }
    }
}

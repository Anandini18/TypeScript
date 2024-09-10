package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Configuration;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection
                .cors(withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "/api/login").permitAll() // Allow public endpoints
                        .anyRequest().authenticated() // All other endpoints require authentication
                )
                .httpBasic(basic -> basic.disable()) // Disable basic auth if using JWT
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder()))); // Add JWT token verification

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Add a JwtDecoder bean that uses your OAuth2 provider's JWKS endpoint
    @Bean
    public JwtDecoder jwtDecoder() {
        String jwksUri = "http://localhost:8080/.well-known/jwks.json"; // Replace with actual JWKS URI
        return NimbusJwtDecoder.withJwkSetUri(jwksUri).build();
    }
}

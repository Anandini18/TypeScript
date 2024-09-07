package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
//                 .authorizeHttpRequests(auth -> auth
//                         .requestMatchers("/api/register", "/api/login").permitAll() // Permit access to register and login endpoints
//                         .anyRequest().authenticated() // Authenticate all other requests
//                 )
//                 .formLogin(form -> form
//                         .loginPage("/api/login") // Set the login page URL
//                         .loginProcessingUrl("/api/login") // Set the login processing URL
//                         .defaultSuccessUrl("/texts", true) // Redirect to /texts after successful login
//                         .failureUrl("/api/login?error=true") // Redirect to login page with error if login fails
//                         .permitAll()
//                 )
//                 .httpBasic(withDefaults()); // Enable HTTP Basic authentication

//         return http.build();
//     }

//     @Bean
//     public BCryptPasswordEncoder bCryptPasswordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF
            .cors() // Enable CORS
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/register", "/api/login").permitAll() // Permit access to register and login endpoints
                .anyRequest().authenticated() // Authenticate all other requests
            )
            // Remove or comment out the formLogin configuration to prevent Spring Security from handling the login form
            .formLogin().disable() // Disable default form login to avoid redirect issues
            .httpBasic(); // Enable HTTP Basic Authentication for testing purposes

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}



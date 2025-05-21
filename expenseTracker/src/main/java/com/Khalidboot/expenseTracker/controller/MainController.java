package com.Khalidboot.expenseTracker.controller;

import com.Khalidboot.expenseTracker.model.Expense;

import com.Khalidboot.expenseTracker.model.Income;
import com.Khalidboot.expenseTracker.model.User;
import com.Khalidboot.expenseTracker.repo.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@CrossOrigin(origins ="http://localhost:5173", allowCredentials = "true")
@RestController
public class MainController {



       @Autowired
       private UserRepo userRepository;

       @Autowired
       private PasswordEncoder passwordEncoder;

       @Autowired
       private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user, HttpServletRequest request) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        // saving password temporarily for authentication
        String rawPassword= user.getPassword();
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Authenticate user after registration
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(), rawPassword
                )
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Create session and store the security context
        HttpSession session = request.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext());

        return ResponseEntity.ok("User registered and logged in");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest, HttpServletRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

            // ✅ This line starts a session and stores the security context
            HttpSession session = request.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext());

            return ResponseEntity.ok("Login successful");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

       @GetMapping("/me")
       public ResponseEntity<String> currentUser(Authentication authentication) {
           return ResponseEntity.ok("Logged in as: " + authentication.getName());
       }

       @GetMapping("/expenses")
       public List<Expense> getExpenses(Authentication auth){
           String username = auth.getName();
           User user=  userRepository.findById(username).get();
           return user.getExpenses();
       }
    @GetMapping("/income")
    public List<Income> getIncome(Authentication auth){
        String username = auth.getName();
        User user=  userRepository.findById(username).get();
        return user.getIncome();
    }
    @PutMapping("/expenses/remove")
    public ResponseEntity<String> removeExpense(Authentication auth, @RequestBody Map<String, Long> payload) {
        String username = auth.getName();
        Long expenseId = payload.get("id");

        User user = userRepository.findById(username).orElseThrow();
        user.getExpenses().removeIf(e -> Objects.equals(e.getId(), expenseId));

        userRepository.save(user); // Save the update!

        return ResponseEntity.ok("Expense removed");
    }


    @PutMapping("/expenses/add")
    public ResponseEntity<String> addExpense(Authentication auth, @RequestBody Expense expense){
        String username= auth.getName();

        User user2 = userRepository.findById(username).get();
        user2.getExpenses().add(expense);
        userRepository.save(user2);
        return ResponseEntity.ok("Expense added");
    }
    @PutMapping("/income/remove")
    public ResponseEntity<String> removeIncome(Authentication auth, @RequestBody Map<String, Long> payload){
        String username= auth.getName();
        Long incomeId= payload.get("id");
        User user = userRepository.findById(username).get();
        user.getIncome().removeIf(e-> Objects.equals(e.getId(), incomeId));
        userRepository.save(user);
        return ResponseEntity.ok("Income removed");
    }
    @PutMapping("/income/add")
    public ResponseEntity<String> addIncome(Authentication auth, @RequestBody Income income){
        String username= auth.getName();

        User user = userRepository.findById(username).get();
        user.getIncome().add(income);
        userRepository.save(user);
        return ResponseEntity.ok("Income added");
    }
}

package com.Khalidboot.expenseTracker.service;


import com.Khalidboot.expenseTracker.model.User;
import com.Khalidboot.expenseTracker.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class MainService {
    @Autowired
    private UserRepo repo;

    public void register(User user) {
        if(repo.findById(user.getUsername()).isEmpty())
        repo.save(user);

    }

    public void login(String username,String password) {
        if(repo.findById(username).get().getPassword()==password){

        }
    }


}

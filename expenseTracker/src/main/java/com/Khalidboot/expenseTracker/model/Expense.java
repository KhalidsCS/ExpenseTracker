package com.Khalidboot.expenseTracker.model;

import com.Khalidboot.expenseTracker.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Generated;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Expense{
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    double amount;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

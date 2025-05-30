package com.trf.admin.service;

import com.trf.admin.model.User;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service("userService")
public class UserService {
    private final AtomicLong idGenerator = new AtomicLong(0);
    private final Map<Long, User> userRepo = new ConcurrentHashMap<>();


    @PostConstruct
    public void setUp() {
        long id = idGenerator.incrementAndGet();
        User starterUser = new User(id, "Eric", "Norrwing", "Uldin");

        userRepo.put(id, starterUser);
        log.info("saved default user for the demo: {}" , starterUser);
    }

    public List<User> getAll(){
        return new ArrayList<>(userRepo.values());
    }

    public User getUserById (Long id) {
        return userRepo.get(id);
    }

    public void save(User user) {
        long id = idGenerator.incrementAndGet();
        user.setId(id);

        userRepo.put(id,user);
    }

    public void update(Long id, User updatedUser) {
        User user = userRepo.get(id);
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setNickName(user.getNickName());

        userRepo.put(id, user);
    }

    public void updateNickName(Long id, String nickName) {
        User user = userRepo.get(id);
        user.setNickName(nickName);

        userRepo.put(id,user);
    }

    public void delete(Long id) {
        userRepo.remove(id);
    }

}
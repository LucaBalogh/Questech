package ro.ubb.tt.dal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.ubb.tt.model.User;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {
    @Query("FROM User user WHERE user.email = :email")
    User findByEmail(String email);

    @Query("FROM User user WHERE user.id = :id")
    User findUserById(Integer id);

    @Query("FROM User us where us.id != 1 ORDER BY us.tokens desc")
    List<User> findTopAll();

    @Modifying
    @Query("update User user set user.tokens = :tokens where user.id = :id")
    void update(@Param(value = "id") int id, @Param(value = "tokens") Integer tokens);
}

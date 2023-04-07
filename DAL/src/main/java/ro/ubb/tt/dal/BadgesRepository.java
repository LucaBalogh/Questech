package ro.ubb.tt.dal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.ubb.tt.model.Badge;

import java.util.List;

public interface BadgesRepository extends JpaRepository<Badge, Integer> {

    @Query("FROM Badge badge WHERE badge.user.id = :userId")
    List<Badge> findAllByUserId(int userId);

    @Query("FROM Badge badge WHERE badge.name = :name")
    Badge findByName(String name);
}

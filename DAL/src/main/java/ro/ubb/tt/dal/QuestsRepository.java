package ro.ubb.tt.dal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.ubb.tt.model.Quest;
import ro.ubb.tt.model.User;

import java.util.List;

public interface QuestsRepository extends JpaRepository<Quest, Integer> {

    @Query("FROM Quest quest WHERE quest.answer <> quest.correct_answer")
    List<Quest> findAllIncompleteQuests();

    @Query("FROM Quest quest WHERE quest.user.id = :userId")
    List<Quest> findAllByUserId(int userId);

    @Modifying
    @Query("update Quest quest set quest.task = :task," +  "quest.correct_answer = :correct_answer," + " quest.answer = :answer," + " quest.tokens = :tokens," + "quest.user = :user where quest.id = :id")
    void update(@Param(value = "id") int id, @Param(value = "task") String task, @Param(value = "correct_answer") String correct_answer, @Param(value = "answer") String answer, @Param(value = "tokens") Integer tokens,  @Param(value = "user") User user);
}

package ro.ubb.tt.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@jakarta.persistence.Entity
@Table(name = "quests")
public class Quest extends Entity implements Serializable{

    @NotNull
    @Column(name = "task")
    private String task;

    @NotNull
    @Column(name = "correct_answer")
    private String correct_answer;

    @Column(name = "answer")
    private String answer;

    @NotNull
    @Column(name = "tokens")
    private Integer tokens;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"quests", "hibernateLazyInitializer"})
    private User user;

    public Quest() {}

    public Quest(@NotNull String task, @NotNull String correct_answer, @NotNull Integer tokens, User user) {
        this.task = task;
        this.correct_answer = correct_answer;
        this.answer = "";
        this.tokens = tokens;
        this.user = user;
    }

    public Quest(@NotNull String task, @NotNull String correct_answer, String answer, @NotNull Integer tokens, User user) {
        this.task = task;
        this.correct_answer = correct_answer;
        this.answer = answer;
        this.tokens = tokens;
        this.user = user;
    }

    public Integer getTokens() {
        return tokens;
    }

    public void setTokens(Integer tokens) {
        this.tokens = tokens;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getCorrect_answer() {
        return correct_answer;
    }

    public void setCorrect_answer(String correct_answer) {
        this.correct_answer = correct_answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Quest {" +
                "task = " + task +
                " correct_answer = " + correct_answer +
                " answer = " + answer +
                " tokens = " + tokens +
                " user_id = " + user.getId() +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Quest))
            return false;
        Quest other = (Quest)o;
        return (other.task.equals(this.task) && other.correct_answer.equals(this.correct_answer) && other.answer.equals(this.answer) && other.tokens == this.tokens &&  other.user == this.user );
    }

    @Override
    public int hashCode()
    {
        return this.user.getId();
    }
}

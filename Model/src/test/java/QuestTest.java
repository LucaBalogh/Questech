import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ro.ubb.tt.model.Quest;
import ro.ubb.tt.model.User;

import static org.junit.jupiter.api.Assertions.assertEquals;


/**
 * This test class tests the class Location from Model
 */
public class QuestTest {

    Quest quest;

    @BeforeEach
    void setUp() {
        quest = new Quest();
    }

    @org.junit.jupiter.api.Test
    void getSetTask() {
        quest.setTask("1 + 1 = ?");
        assertEquals(quest.getTask(),"1 + 1 = ?");
        quest.setTask("");
        assertEquals(quest.getTask(),"");
    }

    @org.junit.jupiter.api.Test
    void getSetCorrectAnswer() {
        quest.setCorrect_answer("2");
        assertEquals(quest.getCorrect_answer(),"2");
        quest.setCorrect_answer("");
        assertEquals(quest.getCorrect_answer(),"");
    }

    @org.junit.jupiter.api.Test
    void getSetAnswer() {
        quest.setAnswer("3");
        assertEquals(quest.getAnswer(),"3");
        quest.setAnswer("");
        assertEquals(quest.getAnswer(),"");
    }

    @org.junit.jupiter.api.Test
    void getSetTokens() {
        quest.setTokens(100);
        assertEquals(quest.getTokens(),100);
        quest.setTokens(0);
        assertEquals(quest.getTokens(),0);
    }

    @Test
    void getSetUserId() {
        User user = new User();
        user.setFirstName("Luca");
        quest.setUser(user);
        assertEquals(quest.getUser(),user);
        User userr = new User();
        quest.setUser(userr);
        assertEquals(quest.getUser(),userr);
    }

}

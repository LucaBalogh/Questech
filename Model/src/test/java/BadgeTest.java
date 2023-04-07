import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ro.ubb.tt.model.Badge;
import ro.ubb.tt.model.User;

import static org.junit.jupiter.api.Assertions.assertEquals;


/**
 * This test class tests the class Location from Model
 */
public class BadgeTest {

    Badge badge;

    @BeforeEach
    void setUp() {
        badge = new Badge();
    }

    @org.junit.jupiter.api.Test
    void getSetName() {
        badge.setName("First 10 quests");
        assertEquals(badge.getName(),"First 10 quests");
        badge.setName("");
        assertEquals(badge.getName(),"");
    }

    @Test
    void getSetUserId() {
        User user = new User();
        user.setFirstName("Luca");
        badge.setUser(user);
        assertEquals(badge.getUser(),user);
        User userr = new User();
        badge.setUser(userr);
        assertEquals(badge.getUser(),userr);
    }

}

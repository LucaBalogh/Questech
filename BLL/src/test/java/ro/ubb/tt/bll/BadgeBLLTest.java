package ro.ubb.tt.bll;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import ro.ubb.tt.dal.BadgesRepository;
import ro.ubb.tt.model.Badge;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes = BadgeBLL.class)
@ExtendWith(MockitoExtension.class)
class BadgeBLLTest {
    List<Badge> allBadges;

    @MockBean
    private BadgesRepository badgesRepository;

    @InjectMocks
    BadgeBLL badgeBLL;

    @BeforeEach
    void setUp() {

        // Mock some repository data in order not to have to connect to the real database
        Badge badge1 = new Badge();
        badge1.setId(1);

        Badge badge2 = new Badge();
        badge2.setId(2);

        Badge badge3 = new Badge();
        badge3.setId(3);

        allBadges = new ArrayList<>();
        allBadges.add(badge1);
        allBadges.add(badge2);
        allBadges.add(badge3);

        // mock the behaviour for get all
        Mockito.when(badgesRepository.findAll()).thenReturn(allBadges);
    }

    @Test
    void getAllBadges(){
        assert (badgeBLL.getAllBadges().size() == 3);
    }

    @Test
    void getAllBadgesForUser(){
        assert (badgeBLL.getAllBadgesForAUser(1).size() == 2);
    }
}
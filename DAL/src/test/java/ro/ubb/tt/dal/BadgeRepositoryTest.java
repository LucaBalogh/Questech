package ro.ubb.tt.dal;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ro.ubb.tt.model.Badge;

import java.util.List;

@SpringBootTest(classes = DALTest.class)
@RunWith(SpringRunner.class)
public class BadgeRepositoryTest {

    @Autowired
    private BadgesRepository badgesRepository;

    @Test
    public void testFindById() {
        List<Badge> badges = badgesRepository.findAllByUserId(1);
        Assert.assertNotNull(badges);
        Assert.assertEquals(2, badges.size());
    }
}

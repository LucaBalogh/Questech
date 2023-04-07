package ro.ubb.tt.dal;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ro.ubb.tt.model.Quest;
import ro.ubb.tt.model.User;

import java.util.List;

@SpringBootTest(classes = DALTest.class)
@RunWith(SpringRunner.class)
public class QuestRepositoryTest {

    @Autowired
    private QuestsRepository questsRepository;

    @Test
    public void testFindIncompleteQuests(){
        List<Quest> quests= questsRepository.findAllIncompleteQuests();
        Assert.assertNotNull(quests);
        Assert.assertEquals(3,quests.size());
    }

    @Test
    public void testFindQuests(){
        List<Quest> quests= questsRepository.findAll();
        Assert.assertNotNull(quests);
        Assert.assertEquals(3,quests.size());
    }
}

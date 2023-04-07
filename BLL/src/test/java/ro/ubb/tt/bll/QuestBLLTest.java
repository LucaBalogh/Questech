package ro.ubb.tt.bll;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import ro.ubb.tt.dal.QuestsRepository;
import ro.ubb.tt.model.Quest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes = QuestBLL.class)
@ExtendWith(MockitoExtension.class)
class QuestBLLTest {
    List<Quest> allQuests;

    @MockBean
    private QuestsRepository questsRepository;

    @InjectMocks
    QuestBLL questBLL;

    @BeforeEach
    void setUp() {

        // Mock some repository data in order not to have to connect to the real database
        Quest quest1 = new Quest();
        quest1.setId(1);

        Quest quest2 = new Quest();
        quest2.setId(2);

        Quest quest3 = new Quest();
        quest3.setId(3);

        allQuests = new ArrayList<>();
        allQuests.add(quest1);
        allQuests.add(quest2);
        allQuests.add(quest3);

        // mock the behaviour for get all
        Mockito.when(questsRepository.findAll()).thenReturn(allQuests);
    }

    @Test
    void getAllQuests(){
        assert (questBLL.getAllQuests().size() == 3);
    }

    @Test
    void getAllIncompleteQuests(){
        assert (questBLL.getAllIncompleteQuests().size() == 3);
    }
}
package ro.ubb.tt.bll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ro.ubb.tt.bll.exceptions.InternalServerException;
import ro.ubb.tt.dal.QuestsRepository;
import ro.ubb.tt.dal.UsersRepository;
import ro.ubb.tt.model.Quest;
import ro.ubb.tt.model.User;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuestBLL {

    private QuestsRepository questsRepository;
    private UsersRepository userRepository;

    @Autowired
    public void setQuestsRepository(UsersRepository userRepository, QuestsRepository questsRepositorys) {
        this.questsRepository = questsRepositorys;
        this.userRepository = userRepository;
    }

    public List<Quest> getAllQuests(){ return questsRepository.findAll(); }

    public List<Quest> getAllIncompleteQuests(){ return questsRepository.findAllIncompleteQuests(); }

    @Transactional
    public Quest addQuest(Quest quest){
        User user = quest.getUser();
        int tokens = user.getTokens() - quest.getTokens();
        userRepository.update(user.getId(), tokens);
        Quest savedQuest = questsRepository.save(quest);
        quest.setId(savedQuest.getId());
        return quest;
    }

    @Transactional
    public Quest updateQuest(Quest quest) throws InternalServerException {
        User us = quest.getUser();
        if(quest.getCorrect_answer().equals(quest.getAnswer())){
            int tokens = quest.getTokens() + us.getTokens();
            userRepository.update(us.getId(), tokens);
        }
        questsRepository.update(quest.getId(), quest.getTask(), quest.getCorrect_answer(), quest.getAnswer(), quest.getTokens(), quest.getUser());
        return questsRepository.findById(quest.getId()).orElseThrow(() -> new InternalServerException("Update went wrong"));
    }
}

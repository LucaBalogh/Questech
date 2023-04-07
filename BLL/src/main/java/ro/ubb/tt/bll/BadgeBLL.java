package ro.ubb.tt.bll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ro.ubb.tt.dal.BadgesRepository;
import ro.ubb.tt.dal.QuestsRepository;
import ro.ubb.tt.dal.UsersRepository;
import ro.ubb.tt.model.Badge;
import ro.ubb.tt.model.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class BadgeBLL {

    private BadgesRepository badgesRepository;
    private UsersRepository usersRepository;

    private QuestsRepository questsRepository;

    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @Autowired
    public void setBadgesRepository(BadgesRepository locationsRepository, UsersRepository usersRepository, QuestsRepository questsRepository) {
        this.badgesRepository = locationsRepository;
        this.usersRepository = usersRepository;
        this.questsRepository = questsRepository;
    }

    public List<Badge> getAllBadgesForAUser(int userId){
        List<Badge> badges = badgesRepository.findAllByUserId(userId);
        User user = usersRepository.findUserById(userId);
        for(Badge b : getFirstQuest(user)) if(b != null) badges.add(b);
        for(Badge b : testNoTokens(user)) if(b != null) badges.add(b);
        for(Badge b : testNoQuests(user)) if(b != null) badges.add(b);
        return badges;
    }

    public List<Badge> getFirstQuest(User user){
        List<Badge> badges = new ArrayList<>();
        if(questsRepository.findAllByUserId(user.getId()).size() >= 1 &&  badgesRepository.findByName("First quest completed!") == null){
            Badge badge = new Badge("First quest completed!", dtf.format(LocalDateTime.now()), user);
            Badge badgeSaved = badgesRepository.save(badge);
            badge.setId(badgeSaved.getId());
            badges.add(badge);
        }
        return badges;
    }

    public List<Badge> testNoTokens(User user){
        List<Badge> badges = new ArrayList<>();
        int contor = 500;
        while(contor < 10000){
            if(user.getTokens() >= contor && badgesRepository.findByName("Over " + contor + " tokens!") == null){
                Badge badge = new Badge("Over " + contor + " tokens!", dtf.format(LocalDateTime.now()), user);
                Badge badgeSaved = badgesRepository.save(badge);
                badge.setId(badgeSaved.getId());
                badges.add(badge);
            }
            contor += 500;
        }
        return badges;
    }

    public List<Badge> testNoQuests(User user){
        List<Badge> badges = new ArrayList<>();
        int contor = 20;
        while(contor < 101){
            if(questsRepository.findAllByUserId(user.getId()).size() >= contor && badgesRepository.findByName(contor + " quests completed successfully!") == null){
                Badge badge = new Badge(contor + " quests completed successfully!", dtf.format(LocalDateTime.now()), user);
                Badge badgeSaved = badgesRepository.save(badge);
                badge.setId(badgeSaved.getId());
                badges.add(badge);
            }
            contor += 20;
        }
        return badges;
    }

    public List<Badge> getAllBadges(){return  badgesRepository.findAll();}
}

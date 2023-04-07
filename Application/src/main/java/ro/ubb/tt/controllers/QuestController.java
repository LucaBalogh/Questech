package ro.ubb.tt.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.ubb.tt.bll.QuestBLL;
import ro.ubb.tt.bll.exceptions.InternalServerException;
import ro.ubb.tt.model.Badge;
import ro.ubb.tt.model.Quest;

import java.util.List;

@RestController
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RequestMapping(QuestController.BASE_URL)
public class QuestController {

    protected static final String BASE_URL = "questech/quests";

    private final QuestBLL questBLL;

    public QuestController(QuestBLL questBLL) {
        this.questBLL = questBLL;
    }

    /**
     * Retrieves all the quests without an answer.
     * @return ResponseEntity<List<Quest>> - all
     */
    @RequestMapping(value = "/get-all", method = RequestMethod.GET)
    public ResponseEntity<List<Quest>> getAllQuests() {
        return new ResponseEntity<>(questBLL.getAllIncompleteQuests(), HttpStatus.OK);
    }

    @RequestMapping(value = "/create")
    public ResponseEntity<Quest> createQuest(@RequestBody Quest quest) {
        return new ResponseEntity<>(questBLL.addQuest(quest), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/update/{questId}")
    public ResponseEntity<Quest> updateQuest(@PathVariable int questId, @RequestBody Quest quest) throws InternalServerException {
        return new ResponseEntity<>(questBLL.updateQuest(quest), HttpStatus.OK);
    }
}

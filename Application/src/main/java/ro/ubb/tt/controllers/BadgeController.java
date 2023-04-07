package ro.ubb.tt.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.ubb.tt.bll.BadgeBLL;
import ro.ubb.tt.model.Badge;

import java.util.List;

@RestController
@CrossOrigin(methods = {RequestMethod.GET})
@RequestMapping(BadgeController.BASE_URL)
public class BadgeController {

    protected static final String BASE_URL = "questech/badges";

    private final BadgeBLL badgeBLL;

    public BadgeController(BadgeBLL badgeBLL) {
        this.badgeBLL = badgeBLL;
    }

    /**
     * Retrieves all the badges associated to an user.
     * @param userId - int
     * @return ResponseEntity<List<Badge>> - all
     */
    @RequestMapping(value = "/get-all-by-user/{userId}", method = RequestMethod.GET)
    public ResponseEntity<List<Badge>> getAllBadgesByUserId(@PathVariable int userId) {
        return new ResponseEntity<>(badgeBLL.getAllBadgesForAUser(userId), HttpStatus.OK);
    }

}

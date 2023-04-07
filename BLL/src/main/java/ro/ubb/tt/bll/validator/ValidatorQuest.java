package ro.ubb.tt.bll.validator;

import org.springframework.stereotype.Component;
import ro.ubb.tt.bll.exceptions.ExceptionMessages;
import ro.ubb.tt.bll.exceptions.InvalidCredentialsException;
import ro.ubb.tt.model.Quest;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValidatorQuest implements Validator<Quest> {

    @Override
    public void validate(Quest quest) throws InvalidCredentialsException {
        List<String> errors = new ArrayList<>();
        System.out.println(quest.getTask() + " " + quest.getCorrect_answer());

        if(quest.getTask() == null || quest.getTask().trim().equals(""))
            errors.add(ExceptionMessages.invalidTask);

        if(quest.getTokens() == null || quest.getTokens() == 0)
            errors.add(ExceptionMessages.invalidTokens);

        if(quest.getCorrect_answer() == null || quest.getCorrect_answer().trim().equals(""))
            errors.add(ExceptionMessages.invalidCorrectAnswer);

        String errorMessage = errors
                .stream()
                .reduce("", String::concat);

        if(!errorMessage.isEmpty()) {
            throw new InvalidCredentialsException(errorMessage);
        }

    }
}
package ro.ubb.tt.bll.validator;

import org.springframework.stereotype.Component;
import ro.ubb.tt.bll.exceptions.ExceptionMessages;
import ro.ubb.tt.bll.exceptions.InvalidCredentialsException;
import ro.ubb.tt.model.Badge;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValidatorBadge implements Validator<Badge> {

    @Override
    public void validate(Badge badge) throws InvalidCredentialsException {
        List<String> errors = new ArrayList<>();
        System.out.println(badge.getName() + " " + badge.getObtained_at());

        if(badge.getName() == null || badge.getName().trim().equals(""))
            errors.add(ExceptionMessages.invalidName);

        if(badge.getObtained_at() == null || badge.getObtained_at().trim().equals(""))
            errors.add(ExceptionMessages.invalidDate);

        String errorMessage = errors
                .stream()
                .reduce("", String::concat);

        if(!errorMessage.isEmpty()) {
            throw new InvalidCredentialsException(errorMessage);
        }

    }
}